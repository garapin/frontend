import LoginPage from "@/pages/login";
import * as React from "react";
import { useState } from "react";
import clsx from "clsx";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import GarapinAppBar from "@/components/GarapinAppBar";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import FallbackSpinner from "@/components/spinner";
import {
  getProductTemplate,
  getProductTemplatePrice,
  getSingleProduct,
  setCalculateTemplatePrice,
} from "@/store/modules/products";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import InputBase from "@mui/material/InputBase";
import CardVertical from "@/components/CardVertical";
import GarapinProductCustomizer from "@/components/GarapinProductCustomizer";
import {
  ProductType,
  StoragePath,
  Template,
  TemplateInput,
} from "@/types/product";
import { useFormik } from "formik";
import { getStorage } from "@/configs/firebase";
import AddressPicker from "@/components/AddressPicker";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import ImageCarousel from "@/components/ImageCarousel";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { storeRequestInquiryToDB, addToCart } from "@/db";
import * as Yup from "yup";
import API from "@/configs/api";
import { uuid } from "uuidv4";
import { rupiah } from "@/tools/rupiah";
import { NumericFormat } from "react-number-format";

// eslint-disable-next-line react/display-name
const BackdropUnstyled = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

styled(ModalUnstyled)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiModal-hidden {
    visibility: hidden;
  }
`);

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
styled(InputBase)(({ theme }) => ({
  color: "#713F97",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 3),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
    },
  },
}));

interface addressMap {
  postalCode?: string;
  completeAddress: string;
  latLong?: { lat: string; long: string };
}

const ProductDetailPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useFirebaseAuth();
  const { slug } = router.query;
  const {
    isProductLoading,
    singleProduct,
    isTemplateLoading,
    productTemplate,
    errors,
    calculateTemplatePrice,
    calculationLoading,
  } = useAppSelector((state) => state.product);
  const [open, setOpen] = React.useState(false);
  const [itemQty, setItemQty] = React.useState(0);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [variantSelectorValue, setVariantSelectorValue] =
    useState<TemplateInput>({});
  const [addressMap, setAddressMap] = useState<addressMap>({
    postalCode: "",
    completeAddress: "",
    latLong: { lat: "", long: "" },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      orderDescription: "",
      quantity: 1,
      contactName: auth.authUser?.displayName ?? "",
      phoneNumber: auth.authUser?.phoneNumber ?? "",
      addressNote: "",
      email: auth.authUser?.email ?? "",
      dimension: {
        width: 0,
        height: 0,
        length: 0,
      },
    },
    validationSchema: Yup.object({
      orderDescription: Yup.string().required("Order Description is required"),
      quantity: Yup.lazy((_val: any) =>
        singleProduct !== undefined && singleProduct.moq !== undefined
          ? Yup.number()
              .required("Quantity is required")
              .min(singleProduct.moq, `Minimum order is ${singleProduct.moq}`)
          : Yup.number().required("Quantity is required")
      ),
      contactName: Yup.lazy((_val: any) => singleProduct?.category !== "02" ? Yup.string().required("Contact Name is required") : Yup.string().optional()),
      phoneNumber: Yup.lazy((_val: any) => singleProduct?.category !== "02" ? Yup.string().required("Phone Number is required") : Yup.string().optional()),
      addressNote: Yup.string().optional(),
      email: Yup.string().required("Email is required"),
      dimension: Yup.object({
        width: Yup.string().min(1, "Minimum 1").required("Width is required"),
        height: Yup.string().min(1, "Minimum 1").required("Height is required"),
        length: Yup.string().min(1, "Minimum 1").required("Length is required"),
      }),
    }),
    onSubmit: async (values) => {
      try {
        const fileData = await handleFileUpload();
        const dataBody = {
          ...values,
          // address: addressMap,
          product: singleProduct,
          template: productTemplate,
          selectedOptions: variantSelectorValue,
          files: [fileData],
          createdAt: new Date(),
        };

        const data = {
          ...values,
          channel: "printing",
          createAt: new Date(),
          delete: false,
          product: singleProduct,
          productCategoryId: singleProduct?.category,
          productId: singleProduct?.id,
          qty: values.quantity,
          status: "cart",
          unitPrice: calculateTemplatePrice?.unitPrice,
          updatedAt: null,
          userId: auth?.authUser?.uid,
          calculationId: calculateTemplatePrice?.calculationId,
          totalPrice: calculateTemplatePrice?.totalPrice,
        };

        if (singleProduct?.category === "02" && !data.calculationId) {
          toast.error("Mohon hitung harga terlebih dahulu");
          return;
        }

        singleProduct.category === "02"
          ? await addToCart(data)
          : await storeRequestInquiryToDB(dataBody);

        singleProduct?.category === "02"
          ? toast.success("Berhasil Menambahkan Ke Cart")
          : toast.success("Permintaan Anda Berhasil Dikirimkan");
        handleClose();
      } catch (e: any) {
        console.error(e);
        toast.error(e.message);
      } finally {
        dispatch(setCalculateTemplatePrice(null));
      }
    },
  });

  React.useEffect(() => {
    if (auth.authUser !== null) {
      formik.setFieldValue("contactName", auth.authUser?.displayName);
      formik.setFieldValue("email", auth.authUser?.email);
    }
  }, [auth.loading, auth.authUser, open]);

  const handleOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setVariantSelectorValue({});
    setSelectedFile(null);
    setAddressMap({
      postalCode: "",
      completeAddress: "",
      latLong: { lat: "", long: "" },
    });
  };

  React.useEffect(() => {
    if (slug !== undefined) {
      dispatch(getSingleProduct(slug as string));
    }
  }, [slug]);

  React.useEffect(() => {
    if (singleProduct !== null && singleProduct !== undefined) {
      dispatch(getProductTemplate(singleProduct.templateId!));
    }
  }, [singleProduct]);

  const handleButtonClick = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const storageRef = getStorage().ref();
      const productType = ProductType.CUSTOM_PACKAGING;
      const fileRef =
        productType == ProductType.READY_TO_BUY.toString()
          ? storageRef.child(`${StoragePath.PATH_RTB}${selectedFile.name}`)
          : productType == ProductType.DIGITAL_PACKAGING.toString()
          ? storageRef.child(`${StoragePath.PATH_DIGITAL}${selectedFile.name}`)
          : storageRef.child(
              `${StoragePath.PATH_CUSTOM}${Date.now()}-${
                auth.authUser?.uid ?? "anon"
              }-${selectedFile.name}`
            );
      const uploadedFile = await fileRef.put(selectedFile);
      console.log(`File ${selectedFile.name} uploaded successfully`);
      return {
        uri: uploadedFile.metadata.fullPath,
        url: await uploadedFile.ref.getDownloadURL(),
      };
    }
  };

  const addButton = (val: any) => {
    setItemQty(val + 1);
  };

  const descButton = (val: any) => {
    setItemQty(val - 1);
  };

  const handleAddToCart = async () => {
    const data = {
      channel: "printing",
      createAt: new Date(),
      delete: false,
      product: singleProduct,
      productCategoryId: singleProduct?.category,
      productId: singleProduct?.id,
      qty: itemQty,
      status: "cart",
      unitPrice: singleProduct?.maxPrice,
      updatedAt: null,
      userId: auth?.authUser?.uid,
    };

    await addToCart(data);
    toast.success("Berhasil Menambahkan Ke Cart");
  };

  const handleToLogin = () => {
    localStorage.setItem("redirect", router.asPath);
    router.push("/login");
  };

  const renderButton = () => {
    if (singleProduct?.category === "01") {
      return (
        <Box className="flex items-center my-10">
          <button
            disabled={itemQty === 0}
            onClick={() => descButton(itemQty)}
            className="w-7 h-7 bg-transparent outline-none border-slate-800 rounded-full cursor-pointer"
          >
            -
          </button>
          <Typography
            fontSize={17}
            marginLeft="15px"
            marginRight="15px"
            fontWeight={600}
            color="text.primary"
          >
            {itemQty}
          </Typography>
          <button
            disabled={itemQty === singleProduct?.stock}
            onClick={() => addButton(itemQty)}
            className="w-7 h-7 bg-transparent outline-none border-slate-800 rounded-full cursor-pointer"
          >
            +
          </button>
          <Button
            className="w-fit ml-8"
            variant="contained"
            sx={{ backgroundColor: "#713F97", color: "white" }}
            onClick={() => handleAddToCart()}
          >
            Add TO Cart
          </Button>
        </Box>
      );
    } else {
      return (
        <Button
          className="my-10 w-fit"
          variant="contained"
          sx={{ backgroundColor: "#713F97", color: "white" }}
          onClick={handleOpen}
        >
          Minta Penawaran
        </Button>
      );
    }
  };

  if (isProductLoading) {
    return <FallbackSpinner />;
  } else {
    return (
      <Box className="items-center">
        <GarapinAppBar searchVariant={true} />
        <Grid maxWidth="lg" container className="pt-20 mx-auto justify-between">
          <Grid
            item
            lg={4}
            alignItems="center"
            justifyContent="center"
            className="w-full px-5"
          >
            <ImageCarousel
              dataSource={
                singleProduct?.img?.map((image: any) => {
                  return {
                    srcUrl: image,
                  };
                }) ?? []
              }
            />
          </Grid>
          <Grid item lg={8} className="block flex-col px-5 w-full">
            <Typography className="pt-10" variant="h4">
              {singleProduct?.productName}
            </Typography>
            <Typography className="pt-2" variant="h5" color="#713F97">
              Rp {singleProduct?.minPrice?.toLocaleString("id-ID")} - Rp{" "}
              {singleProduct?.maxPrice?.toLocaleString("id-ID")} / pcs
            </Typography>
            <Box
              className="flex flex-row p-4 mt-6"
              sx={{ borderRadius: "10px", backgroundColor: "#FADEFF" }}
            >
              <img src="/warning_icon.svg" alt="icon warning" />
              <Typography className="pl-4">
                Harga yang tertera merupakan estimasi dan dapat berubah sesuai
                kebutuhan atau permintaan yang diajukan
              </Typography>
            </Box>
            <Box className="flex flex-col">
              <Box className="flex flex-row items-center justify-between pt-6">
                <Typography variant="body2">Min. Pemesananan</Typography>
                <Typography variant="body1">
                  <b>{singleProduct?.moq?.toLocaleString("id-ID")} pcs</b>
                </Typography>
              </Box>
              <Divider className="pt-2" />
              <Box className="flex flex-row items-center justify-between pt-2">
                <Box className="flex flex-row items-center">
                  <Typography className="mr-2" variant="body2">
                    Lama Pengerjaan
                  </Typography>
                  <img
                    className="w-3 h-3"
                    src="/warning_icon.svg"
                    alt="icon warning"
                  />
                </Box>
                <Typography variant="body1">
                  <b>{singleProduct?.leadTime} hari</b>
                </Typography>
              </Box>
              <Divider className="pt-2" />

              {renderButton()}

              <form onSubmit={formik.handleSubmit}>
                <Dialog
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                  open={open}
                  slots={{ backdrop: Backdrop }}
                  scroll={scroll}
                  maxWidth={"lg"}
                >
                  <DialogTitle>
                    {auth.authUser !== null
                      ? singleProduct?.category == "02"
                        ? "Customize Product"
                        : "Minta Penawaran"
                      : "Login untuk minta penawaran"}
                  </DialogTitle>
                  <DialogContent dividers={scroll === "paper"}>
                    {auth.authUser !== null ? (
                      <>
                        <Typography variant="body2">
                          Anda mengajukan penawaran untuk produk berikut:
                        </Typography>
                        <br />
                        <CardVertical
                          imageUrl={singleProduct?.img?.[0]!}
                          productName={singleProduct?.productName ?? ""}
                          price={`Rp ${singleProduct?.minPrice?.toLocaleString(
                            "id-ID"
                          )} -
                                            Rp ${singleProduct?.maxPrice?.toLocaleString(
                                              "id-ID"
                                            )}`}
                          location="Jakarta"
                          slug={singleProduct?.slug ?? ""}
                          clickable={false}
                          maxWidth="250px"
                        />
                        <br />
                        <Divider />
                        <br />
                        {errors !== undefined && (
                          <Alert severity="error">{errors}</Alert>
                        )}
                        {(productTemplate == undefined ||
                          isTemplateLoading) && <CircularProgress />}
                        {productTemplate && !isTemplateLoading && (
                          <GarapinProductCustomizer
                            template={productTemplate}
                            value={variantSelectorValue}
                            handleChange={(variant, selected) => {
                              if (selected !== undefined) {
                                setVariantSelectorValue({
                                  ...variantSelectorValue,
                                  [variant.id]: {
                                    variant,
                                    selectedOption: selected,
                                  },
                                });
                              }
                            }}
                            options={{
                              alignVariantOptions: "left",
                              showPriceCalculation: false,
                            }}
                          />
                        )}
                        <br />
                        <Divider />
                        <br />
                        <Typography variant="body1">
                          <b>Detail Produk</b>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                          Masukkan informasi seputar kebutuhan anda atau
                          pertanyaan terkait produk ini
                        </Typography>
                        <br />
                        <TextField
                          fullWidth
                          label="Order description"
                          required
                          error={
                            formik.touched.orderDescription &&
                            Boolean(formik.errors.orderDescription)
                          }
                          helperText={
                            Boolean(formik.touched.orderDescription) &&
                            formik.errors.orderDescription
                          }
                          value={formik.values.orderDescription}
                          name={"orderDescription"}
                          multiline
                          rows={6}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <br />
                        <br />
                        <Box
                          sx={{
                            mt: 3,
                          }}
                        >
                          <Typography variant="body2">
                            Dimension (cm):
                          </Typography>
                          <Grid
                            container
                            sx={{
                              mt: 2,
                            }}
                            spacing={2}
                            md={8}
                          >
                            <Grid item md={4}>
                              <NumericFormat
                                value={formik.values.dimension?.width}
                                allowLeadingZeros
                                fullWidth
                                allowedDecimalSeparators={[",", "."]}
                                decimalSeparator="."
                                customInput={TextField}
                                variant="outlined"
                                label="Width"
                                name={"width"}
                                required
                                inputProps={{
                                  style: {
                                    padding: "10px 14px",
                                  },
                                }}
                                InputLabelProps={{
                                  style: {
                                    fontSize: "14px",
                                  },
                                }}
                                error={Boolean(formik.errors.dimension?.width)}
                                helperText={
                                  Boolean(formik.errors) &&
                                  formik.errors.dimension?.width
                                }
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "dimension.width",
                                    e.target.value
                                  );
                                }}
                              />
                            </Grid>
                            <Grid item md={4}>
                              <NumericFormat
                                value={formik.values.dimension?.length}
                                allowLeadingZeros
                                fullWidth
                                allowedDecimalSeparators={[",", "."]}
                                decimalSeparator="."
                                customInput={TextField}
                                variant="outlined"
                                label="Length"
                                name={"length"}
                                required
                                inputProps={{
                                  style: {
                                    padding: "10px 14px",
                                  },
                                }}
                                InputLabelProps={{
                                  style: {
                                    fontSize: "14px",
                                  },
                                }}
                                error={Boolean(formik.errors.dimension?.length)}
                                helperText={
                                  Boolean(formik.errors) &&
                                  formik.errors.dimension?.length
                                }
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "dimension.length",
                                    e.target.value
                                  );
                                }}
                              />
                            </Grid>
                            <Grid item md={4}>
                              <NumericFormat
                                value={formik.values.dimension?.height}
                                allowLeadingZeros
                                fullWidth
                                allowedDecimalSeparators={[",", "."]}
                                decimalSeparator="."
                                customInput={TextField}
                                variant="outlined"
                                label="Height"
                                name={"height"}
                                required
                                inputProps={{
                                  style: {
                                    padding: "10px 14px",
                                  },
                                }}
                                InputLabelProps={{
                                  style: {
                                    fontSize: "14px",
                                  },
                                }}
                                error={Boolean(formik.errors.dimension?.height)}
                                helperText={
                                  Boolean(formik.errors) &&
                                  formik.errors.dimension?.height
                                }
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "dimension.height",
                                    e.target.value
                                  );
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <br />
                        <TextField
                          fullWidth
                          label="Qty"
                          value={formik.values.quantity}
                          required
                          type="number"
                          error={Boolean(formik.errors.quantity)}
                          helperText={formik.errors.quantity}
                          name={"quantity"}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <br />
                        <br />
                        <Box className="max-w-full">
                          <TextField
                            placeholder={"Upload Files"}
                            fullWidth
                            value={selectedFile?.name ?? ""}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Box>
                                    <Button
                                      variant="contained"
                                      color="garapinColor"
                                      onClick={handleButtonClick}
                                    >
                                      SELECT FILE
                                    </Button>
                                    <input
                                      id="file-input"
                                      type="file"
                                      onChange={handleFileChange}
                                      style={{ display: "none" }}
                                    />
                                  </Box>
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                        </Box>
                        <br />
                        {singleProduct?.category == "02" && (
                          <>
                            <Box>
                              <Typography
                                variant="body1"
                                sx={{ paddingBottom: "0.5rem" }}
                              >
                                <b>
                                  Rincian Produk{" "}
                                  {calculateTemplatePrice &&
                                    `(W: ${calculateTemplatePrice?.dimension?.width}cm, L: ${calculateTemplatePrice.dimension?.length}cm, H: ${calculateTemplatePrice.dimension?.height}cm)`}
                                </b>
                              </Typography>
                              <Button
                                variant="contained"
                                color="garapinColor"
                                disabled={Boolean(calculationLoading)}
                                onClick={() =>
                                  dispatch(
                                    getProductTemplatePrice({
                                      product: singleProduct,
                                      selectedOptions: variantSelectorValue,
                                      dimension: formik.values.dimension,
                                      quantity: formik.values.quantity,
                                    })
                                  )
                                }
                              >
                                Hitung Harga{" "}
                                {calculationLoading && (
                                  <CircularProgress
                                    size={18}
                                    sx={{
                                      marginLeft: "0.5rem",
                                    }}
                                    color="inherit"
                                  />
                                )}
                              </Button>
                              <br />
                              {calculateTemplatePrice && (
                                <>
                                  <br />
                                  <Divider />
                                  <Box
                                    sx={{
                                      marginTop: "0.5rem",
                                    }}
                                  >
                                    {Object.values(
                                      calculateTemplatePrice.options
                                    ).map((option: any, idx) => (
                                      <Grid
                                        container
                                        sx={{
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        <Grid item md={6}>
                                          <Typography variant="body1" key={idx}>
                                            {option?.variant?.id}
                                          </Typography>
                                        </Grid>
                                        <Grid item md={6}>
                                          <Typography variant="body1" key={idx}>
                                            : {option?.selectedOption?.value}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    ))}
                                    <Grid container sx={{ marginTop: ".5rem" }}>
                                      <Grid item md={8}>
                                        <Typography variant="body2">
                                          <b>Quantity</b>
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        md={4}
                                        sx={{ textAlign: "right" }}
                                      >
                                        <Typography variant="body2">
                                          <b>
                                            {calculateTemplatePrice?.quantity}
                                          </b>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid container sx={{ marginTop: ".5rem" }}>
                                      <Grid item md={8}>
                                        <Typography variant="body2">
                                          <b>Price per unit</b>
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        md={4}
                                        sx={{ textAlign: "right" }}
                                      >
                                        <Typography variant="body2">
                                          <b>
                                            {rupiah(
                                              parseFloat(
                                                (calculateTemplatePrice?.unitPrice as string) ??
                                                  "0"
                                              )
                                            )}
                                          </b>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid container sx={{ marginTop: ".5rem" }}>
                                      <Grid item md={8}>
                                        <Typography variant="body2">
                                          <b>Total Price</b>
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        md={4}
                                        sx={{ textAlign: "right" }}
                                      >
                                        <Typography variant="body2">
                                          <b>
                                            {rupiah(
                                              parseFloat(
                                                (calculateTemplatePrice?.totalPrice as string) ??
                                                  "0"
                                              )
                                            )}
                                          </b>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </>
                              )}
                            </Box>
                            <br />
                          </>
                        )}
                        {singleProduct?.category !== "02" && (
                          <>
                            <Divider />
                            <br />
                            <Typography variant="body1">
                              <b>Data Kontak</b>
                            </Typography>
                            <br />
                            <Typography variant="body2">
                              Mohon berikan kontak yang dapat dihubungi. Kami
                              akan menindaklanjuti permintaan Anda melalui
                              kontak berikut.
                            </Typography>
                            <br />
                            <TextField
                              fullWidth
                              label="Nama Contact Person"
                              error={
                                formik.touched.contactName &&
                                Boolean(formik.errors.contactName)
                              }
                              helperText={
                                Boolean(formik.touched.contactName) &&
                                formik.errors.contactName
                              }
                              value={formik.values.contactName}
                              name={"contactName"}
                              required
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <br />
                            <AddressPicker
                              onLocationSelect={(place) => {
                                const postalCode =
                                  place.address_components?.find(
                                    (component: any) => {
                                      return component.types.includes(
                                        "postal_code"
                                      );
                                    }
                                  )?.long_name;
                                const completeAddress = place.formatted_address;
                                const geometry = place?.geometry?.location;
                                let latLong = {
                                  lat: "",
                                  lng: "",
                                };
                                if (geometry != undefined) {
                                  latLong = {
                                    lat: geometry.lat().toString(),
                                    lng: geometry.lng().toString(),
                                  };
                                }
                                const objAddress: any = {
                                  completeAddress,
                                  postalCode,
                                  latLong,
                                };

                                setAddressMap(objAddress);
                              }}
                              label=""
                            />
                            <br />
                            <TextField
                              fullWidth
                              label="Keterangan Alamat"
                              value={formik.values.addressNote}
                              error={
                                formik.touched.addressNote &&
                                Boolean(formik.errors.addressNote)
                              }
                              helperText={
                                Boolean(formik.errors) &&
                                formik.errors.addressNote
                              }
                              name={"addressNote"}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <br />
                            <TextField
                              fullWidth
                              label="Nomor HP/WA"
                              placeholder="081234567890"
                              value={formik.values.phoneNumber}
                              error={
                                formik.touched.phoneNumber &&
                                Boolean(formik.errors.phoneNumber)
                              }
                              helperText={
                                Boolean(formik.errors) &&
                                formik.errors.phoneNumber
                              }
                              name={"phoneNumber"}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <br />
                            <TextField
                              fullWidth
                              label="Email"
                              placeholder="emailanda@nama-perusahaan.co.id"
                              required
                              error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                              }
                              helperText={
                                Boolean(formik.touched.email) &&
                                formik.errors.email
                              }
                              value={formik.values.email}
                              name={"email"}
                              onBlur={formik.handleBlur}
                              disabled
                              onChange={formik.handleChange}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Typography variant="body2">
                          Silahkan login terlebih dahulu untuk mengajukan
                          penawaran.
                        </Typography>
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button variant="text" onClick={handleClose}>
                      Batal
                    </Button>
                    {auth.authUser == null ? (
                      <Button
                        variant="contained"
                        color="garapinColor"
                        onClick={handleToLogin}
                      >
                        Login
                      </Button>
                    ) : singleProduct?.category === "02" ? (
                      <Button
                        variant="text"
                        type="submit"
                        onClick={formik.submitForm}
                        disabled={formik.isSubmitting || !formik.isValid}
                      >
                        Add to cart{" "}
                        {formik.isSubmitting && <CircularProgress size={10} />}
                      </Button>
                    ) : (
                      <Button
                        variant="text"
                        type="submit"
                        onClick={formik.submitForm}
                        disabled={formik.isSubmitting || !formik.isValid}
                      >
                        Kirim Permintaan{" "}
                        {formik.isSubmitting && <CircularProgress size={10} />}
                      </Button>
                    )}
                  </DialogActions>
                </Dialog>
              </form>
              <Divider className="pt-2" />
              <Box>
                <Typography className="pt-16" color="#7C7C7C" variant="h5">
                  Tentang Produk
                </Typography>
                <Typography className="pt-6" color="#3A3A3A" variant="body2">
                  {singleProduct?.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className="py-20 md:px-60">
          <img width="100%" src="/banner_inquiry.svg" alt="banner inquiry" />
        </Box>
      </Box>
    );
  }
};

LoginPage.authGuard = false;
LoginPage.guestGuard = false;

export default ProductDetailPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["products", "common"])),
    },
  };
};
