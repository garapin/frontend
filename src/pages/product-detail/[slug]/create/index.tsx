import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { addToCart, storeRequestInquiryToDB } from "@/db";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import {
  getCalculateProductPricing,
  getProductTemplatePrice,
  getSingleProduct,
  setCalculateTemplatePrice,
} from "@/store/modules/products";
import { getCategoryLabel, numberFormat, uppercaseString } from "@/tools/utils";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getStorage } from "@/configs/firebase";
import { ProductType, StoragePath, TemplateInput } from "@/types/product";
import CardVertical from "@/components/CardVertical";
import { getProductPrice, rupiah } from "@/tools/rupiah";
import GarapinProductCustomizer from "@/components/GarapinProductCustomizer";
import AddressPicker from "@/components/AddressPicker";
import ModalLogin from "@/components/ModalLogin";
import { wrapper } from "@/store";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { t } from "i18next";

interface addressMap {
  postalCode?: string;
  completeAddress: string;
  latLong?: { lat: string; long: string };
}

const index = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    isProductLoading,
    templatePrice,
    singleProduct,
    isTemplateLoading,
    productTemplate,
    errors,
    calculateTemplatePrice,
    calculationLoading,
  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [itemQty, setItemQty] = React.useState<any>(
    singleProduct?.moq?.toString() ?? 0
  );
  const [addressMap, setAddressMap] = React.useState<addressMap>({
    postalCode: "",
    completeAddress: "",
    latLong: { lat: "", long: "" },
  });
  const [variantSelectorValue, setVariantSelectorValue] =
    React.useState<TemplateInput>({});
  const auth = useFirebaseAuth();
  const [fetchingPrice, setFetchingPrice] = React.useState(false);
  const templatePricingIdempotencyKey = React.useMemo(() => uuid(), []);
  const productTemplateIdempotencyKey = React.useMemo(() => uuid(), []);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const debounceCalculatePrice = React.useRef(
    debounce(async (itemQty, singleProduct) => {
      setFetchingPrice(true);
      const data: any = await dispatch(
        getCalculateProductPricing(
          itemQty,
          singleProduct.id,
          templatePricingIdempotencyKey
        )
      );
      if (data) {
        setFetchingPrice(false);
      }
    }, 500)
  ).current;

  React.useEffect(() => {
    if (slug !== undefined) {
      dispatch(getSingleProduct(slug as string));
    }
  }, [slug]);

  React.useEffect(() => {
    if (slug !== undefined) {
      setItemQty(singleProduct?.moq?.toString() ?? 0);
      if (singleProduct.moq && singleProduct.category == 1) {
        debounceCalculatePrice(singleProduct?.moq?.toString(), singleProduct);
      }
    }
  }, [singleProduct.moq]);

  const formikRTB = useFormik({
    enableReinitialize: true,
    initialValues: {
      orderDescription: "",
    },
    validationSchema: Yup.object({
      orderDescription: Yup.string().required("Order Description is required"),
    }),
    onSubmit: async (values) => {
      if (itemQty < singleProduct?.moq) {
        toast.error(
          `Jumlah pesanan tidak boleh kurang dari ${singleProduct?.moq}`
        );
        return;
      }

      const fileData = await handleFileUpload();
      const data = {
        channel: "printing",
        createAt: new Date(),
        delete: false,
        orderDescription: values.orderDescription,
        files: fileData ? [fileData] : null,
        product: singleProduct,
        productCategoryId: singleProduct?.category,
        productId: singleProduct?.id,
        qty: itemQty,
        status: "cart",
        unitPrice: templatePrice?.unitPrice ?? 0,
        updatedAt: null,
        userId: auth?.authUser?.uid,
        totalPrice: templatePrice?.totalPrice,
        calculationId: templatePrice?.calculationId,
        weight: singleProduct?.weightCalculation,
        idempotencyKey: templatePrice?.idempotencyKey,
      };

      await addToCart(data);
      toast.success("Berhasil Menambahkan Ke Cart");
      router.back();
    },
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
              .typeError("Quantity must be a number")
          : Yup.number()
              .required("Quantity is required")
              .typeError("Quantity must be a number")
      ),
      contactName: Yup.lazy((_val: any) =>
        singleProduct?.category !== "02"
          ? Yup.string().required("Contact Name is required")
          : Yup.string().optional()
      ),
      phoneNumber: Yup.lazy((_val: any) =>
        singleProduct?.category !== "02"
          ? Yup.string().required("Phone Number is required")
          : Yup.string().optional()
      ),
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
          address: {
            ...addressMap,
            postalCode: addressMap.postalCode ?? "",
          },
          product: singleProduct,
          template: productTemplate,
          selectedOptions: variantSelectorValue,
          files: fileData ? [fileData] : null,
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
          idempotencyKey: calculateTemplatePrice?.idempotencyKey,
          weight: calculateTemplatePrice?.weight,
          selectedOptions: variantSelectorValue,
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

        router.back();
      } catch (e: any) {
        console.error(e);
        toast.error(e.message);
      } finally {
        dispatch(setCalculateTemplatePrice(null));
      }
    },
  });

  if (!singleProduct || Array.isArray(singleProduct)) {
    return null;
  }

  const handleBuyRTB = async () => {
    formikRTB.handleSubmit();
  };

  const addButton = async (val: any) => {
    if (typeof val === "number") val = val.toString();
    setItemQty((parseInt(val.replace(/[^0-9]/g, "")) + 1).toString());
    debounceCalculatePrice(
      (parseInt(val.replace(/[^0-9]/g, "")) + 1).toString(),
      singleProduct
    );
  };

  const descButton = (val: any) => {
    if (val == 0) return;
    setItemQty((parseInt(val.replace(/[^0-9]/g, "")) - 1).toString());
    debounceCalculatePrice(
      (parseInt(val.replace(/[^0-9]/g, "")) - 1).toString(),
      singleProduct
    );
  };

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

  return (
    <div className="bg-slate-50">
      <div className="max-w-[940px] mx-auto p-6 md:py-8">
        <div className="bg-white rounded-t-xl pt-8 px-6 space-y-6">
          <h2 className="text-[32px] font-semibold">
            {getCategoryLabel(singleProduct?.category)}
          </h2>
          <p className="text-slate-700">
            Anda mengajukan penawaran untuk produk berikut :
          </p>
          <div className="bg-slate-50 rounded-xl p-4 space-y-3 lg:flex lg:items-center lg:gap-4">
            <img
              src={singleProduct?.img[0] ?? imagePlaceholder}
              alt={singleProduct?.name}
              className="rounded-xl w-full aspect-auto object-contain lg:w-44 lg:h-44"
            />
            <div className="space-y-3">
              <p className="text-[#713F97] font-semibold text-sm">
                {getCategoryLabel(singleProduct?.category)}
              </p>
              <p className="font-semibold">{singleProduct?.productName}</p>
              <div className="flex items-center gap-2 text-slate-700 font-light">
                {singleProduct?.category == 1 ? (
                  <p className="font-semibold border-r-2 border-slate-700 text-sm">
                    {templatePrice?.unitPrice?.toFixed(2)}
                  </p>
                ) : (
                  <p className="font-semibold border-r-2 border-slate-700 text-sm">
                    {getProductPrice(singleProduct)}
                  </p>
                )}
                {singleProduct?.category == 1 && (
                  <>
                    <p className="font-semibold border-slate-700 text-sm">|</p>
                    <p className="font-semibold border-slate-700 text-sm">
                      {itemQty} pcs
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <Divider />
        </div>
        {singleProduct?.category == 1 ? (
          <form onSubmit={formikRTB.handleSubmit}>
            <div className="bg-white p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-slate-600 font-semibold text-sm">
                  Detail Produk
                </p>
                <TextField
                  placeholder="Masukan Deskripsi Produk Anda"
                  multiline
                  rows={10}
                  fullWidth
                  error={
                    formikRTB.touched.orderDescription &&
                    Boolean(formikRTB.errors.orderDescription)
                  }
                  helperText={
                    Boolean(formikRTB.touched.orderDescription) &&
                    formikRTB.errors.orderDescription
                  }
                  value={formikRTB.values.orderDescription}
                  name={"orderDescription"}
                  onBlur={formikRTB.handleBlur}
                  onChange={formikRTB.handleChange}
                />
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 font-semibold text-sm">
                  Kuantitas Produk
                </p>
                <Box className="flex items-center my-10 gap-2 md:max-w-[200px]">
                  <Button
                    disabled={itemQty == 0}
                    onClick={() => descButton(itemQty)}
                    variant="contained"
                    className="rounded-md p-2 max-w-[40px] h-[40px] min-w-fit"
                  >
                    <RemoveIcon />
                  </Button>
                  <NumericFormat
                    value={itemQty}
                    allowLeadingZeros
                    className="w-20 flex-1 py-2 text-center border-none outline-none text-lg"
                    thousandSeparator=","
                    onChange={(e) => {
                      setItemQty(e.target.value);
                      debounceCalculatePrice(e.target.value, singleProduct);
                    }}
                  />
                  <Button
                    disabled={itemQty === singleProduct?.stock}
                    onClick={() => addButton(itemQty)}
                    variant="contained"
                    className="rounded-md p-2 max-w-[40px] h-[40px] min-w-fit"
                  >
                    <AddIcon />
                  </Button>
                </Box>
                <div className="space-y-4 py-2">
                  <p className="text-slate-600 font-semibold text-sm">
                    Upload File Logo
                  </p>
                  <Button
                    variant="contained"
                    className="capitalize"
                    onClick={handleButtonClick}
                  >
                    Upload Image
                  </Button>
                  {selectedFile && <p>{selectedFile?.name}</p>}
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="bg-white px-6 pt-6 pb-8 flex items-center gap-4 rounded-b-xl">
              <Button
                variant="outlined"
                className="capitalize py-2 lg:py-4 text-lg"
                fullWidth
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="capitalize py-2 lg:py-4 text-lg"
                fullWidth
                disabled={fetchingPrice}
                onClick={handleBuyRTB}
              >
                Beli
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-white p-6 space-y-6">
              {errors !== undefined && <Alert severity="error">{errors}</Alert>}
              {(productTemplate == undefined || isTemplateLoading) && (
                <CircularProgress />
              )}
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
              <div className="space-y-4 py-2">
                <p className="text-slate-600 font-semibold text-sm">
                  Upload File Logo
                </p>
                <Button
                  variant="contained"
                  className="capitalize"
                  onClick={handleButtonClick}
                >
                  Upload Image
                </Button>
                {selectedFile && <p>{selectedFile?.name}</p>}
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Typography
                    variant="body1"
                    className="font-medium text-base text-slate-600"
                  >
                    Detail Produk
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-normal text-base text-slate-600"
                  >
                    Masukkan informasi seputar kebutuhan anda atau pertanyaan
                    terkait produk ini
                  </Typography>
                </div>
                <TextField
                  fullWidth
                  // label="Order description"
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
                <Box
                  sx={{
                    mt: 3,
                  }}
                  className="space-y-4"
                >
                  <div className="md:grid md:grid-cols-12 md:gap-4 space-y-4">
                    <div className="md:col-span-6 w-full md:order-2">
                      <img
                        src="/assets/dimension.png"
                        alt="dimension"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-4 md:col-span-6 md:order-1">
                      <Box className="w-full">
                        <p className="font-medium text-base text-slate-600 font-sans pb-2">
                          Width (cm)
                        </p>
                        <NumericFormat
                          value={formik.values.dimension?.width}
                          allowLeadingZeros
                          fullWidth
                          allowedDecimalSeparators={[",", "."]}
                          decimalSeparator="."
                          customInput={TextField}
                          variant="outlined"
                          name={"width"}
                          required
                          InputProps={{
                            className: "rounded-lg",
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
                      </Box>
                      <Box className="w-full">
                        <p className="font-medium text-base text-slate-600 font-sans pb-2">
                          Length (cm)
                        </p>
                        <NumericFormat
                          value={formik.values.dimension?.length}
                          allowLeadingZeros
                          fullWidth
                          allowedDecimalSeparators={[",", "."]}
                          decimalSeparator="."
                          customInput={TextField}
                          variant="outlined"
                          name={"length"}
                          required
                          InputProps={{
                            className: "rounded-lg",
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
                      </Box>
                      <Box className="w-full">
                        <p className="font-medium text-base text-slate-600 font-sans pb-2">
                          Height (cm)
                        </p>
                        <NumericFormat
                          value={formik.values.dimension?.height}
                          allowLeadingZeros
                          fullWidth
                          allowedDecimalSeparators={[",", "."]}
                          decimalSeparator="."
                          customInput={TextField}
                          variant="outlined"
                          name={"height"}
                          required
                          InputProps={{
                            className: "rounded-lg",
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
                      </Box>
                    </div>
                  </div>

                  <Typography
                    variant="h6"
                    sx={{ lineHeight: 1 }}
                    className="text-base font-semibold text-slate-600"
                  >
                    {`Kuantitas ( Min ${singleProduct?.moq ?? 0} pcs )`}
                  </Typography>
                  <div className="lg:max-w-[200px]">
                    <Box className="flex items-center gap-2">
                      <Button
                        disabled={formik.values.quantity == 0}
                        onClick={() =>
                          formik.setFieldValue(
                            "quantity",
                            formik.values.quantity - 1
                          )
                        }
                        variant="contained"
                        className="rounded-md p-2 max-w-[40px] h-[40px] min-w-fit"
                      >
                        <RemoveIcon />
                      </Button>
                      <NumericFormat
                        value={formik.values.quantity}
                        allowLeadingZeros
                        className="w-20 flex-1 py-2 text-center border-none outline-none text-lg"
                        thousandSeparator=","
                        onChange={(e) => {
                          formik.setFieldValue(
                            "quantity",
                            parseInt(e.target.value.replace(/[^0-9]/g, "") ?? 0)
                          );
                        }}
                        onBlur={formik.handleBlur}
                        name={"quantity"}
                      />
                      <Button
                        disabled={itemQty === singleProduct?.stock}
                        onClick={() =>
                          formik.setFieldValue(
                            "quantity",
                            formik.values.quantity + 1
                          )
                        }
                        variant="contained"
                        className="rounded-md p-2 max-w-[40px] h-[40px] min-w-fit"
                      >
                        <AddIcon />
                      </Button>
                    </Box>
                    {formik.errors.quantity && (
                      <p className="text-sm text-red-600">
                        {formik.errors.quantity}
                      </p>
                    )}
                  </div>
                </Box>

                {singleProduct?.category == "02" && (
                  <>
                    <Box>
                      <Button
                        variant="contained"
                        color="garapinColor"
                        fullWidth
                        className="rounded-lg py-4 capitalize"
                        disabled={Boolean(calculationLoading)}
                        onClick={() =>
                          dispatch(
                            getProductTemplatePrice({
                              product: singleProduct,
                              selectedOptions: variantSelectorValue,
                              dimension: formik.values.dimension,
                              quantity: formik.values.quantity,
                              idempotencyKey: productTemplateIdempotencyKey,
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
                      {calculateTemplatePrice && (
                        <>
                          <Box>
                            <Typography
                              variant="h3"
                              className="text-3xl my-6 font-semibold"
                            >
                              Hasil Hitung
                            </Typography>
                            <div className="space-y-4">
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
                                    <Typography
                                      variant="body1"
                                      className="text-slate-700 font-semibold text-sm"
                                      key={idx}
                                    >
                                      {uppercaseString(option?.variant?.id)}
                                    </Typography>
                                  </Grid>
                                  <Grid item md={6} className="text-right">
                                    <Typography
                                      variant="body1"
                                      className="text-slate-700 font-semibold text-sm"
                                      key={idx + 1}
                                    >
                                      {option?.selectedOption
                                        ?.map((item: any) => item.name)
                                        .join(", ")}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              ))}
                              <Grid container sx={{ marginTop: ".5rem" }}>
                                <Grid item md={8}>
                                  <Typography variant="body1">
                                    Kuantitas
                                  </Typography>
                                </Grid>
                                <Grid item md={4} sx={{ textAlign: "right" }}>
                                  <Typography variant="body1">
                                    {numberFormat(
                                      calculateTemplatePrice?.quantity
                                    )}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid container sx={{ marginTop: ".5rem" }}>
                                <Grid item md={8}>
                                  <Typography
                                    variant="body1"
                                    className="text-slate-700 font-semibold text-sm"
                                  >
                                    Harga Satuan
                                  </Typography>
                                </Grid>
                                <Grid item md={4} sx={{ textAlign: "right" }}>
                                  <Typography
                                    variant="body1"
                                    className="text-slate-700 font-semibold text-sm"
                                  >
                                    {rupiah(
                                      parseFloat(
                                        (calculateTemplatePrice?.unitPrice as string) ??
                                          "0"
                                      )
                                    )}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Divider />
                              <Grid container sx={{ marginTop: ".5rem" }}>
                                <Grid item md={8}>
                                  <Typography
                                    variant="body1"
                                    className="font-semibold text-sm"
                                  >
                                    Harga Total
                                  </Typography>
                                </Grid>
                                <Grid item md={4} sx={{ textAlign: "right" }}>
                                  <Typography
                                    variant="body1"
                                    className="font-semibold text-sm"
                                  >
                                    {rupiah(
                                      parseFloat(
                                        (calculateTemplatePrice?.totalPrice as string) ??
                                          "0"
                                      )
                                    )}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </div>
                          </Box>
                        </>
                      )}
                    </Box>
                    <br />
                  </>
                )}
                {singleProduct?.category !== "02" && (
                  <>
                    <div className="space-y-2">
                      <Typography
                        variant="body1"
                        className="text-3xl my-6 font-semibold"
                      >
                        Data Pribadi
                      </Typography>
                      <Typography
                        variant="body2"
                        className="font-normal text-base text-slate-600"
                      >
                        Mohon berikan kontak yang dapat dihubungi. Kami akan
                        menindaklanjuti permintaan Anda melalui kontak berikut.
                      </Typography>
                    </div>
                    <Box className="w-full">
                      <p className="font-medium text-base text-slate-600 font-sans pb-2">
                        Nama Kontak
                      </p>
                      <TextField
                        fullWidth
                        placeholder="Masukkan Nama Kontak Anda"
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
                        InputProps={{
                          className: "rounded-lg",
                        }}
                        required
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </Box>
                    <Box className="w-full">
                      <p className="font-medium text-base text-slate-600 font-sans pb-2">
                        Alamat Perusahaan
                      </p>
                      <AddressPicker
                        onLocationSelect={(place) => {
                          const postalCode = place.address_components?.find(
                            (component: any) => {
                              return component.types.includes("postal_code");
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
                          formik.setFieldValue("postalCode", postalCode);
                        }}
                      />
                    </Box>
                    <Box className="w-full">
                      <p className="font-medium text-base text-slate-600 font-sans pb-2">
                        Keterangan Alamat
                      </p>
                      <TextField
                        fullWidth
                        placeholder="Masukkan Keterangan Alamat Anda"
                        value={formik.values.addressNote}
                        error={
                          formik.touched.addressNote &&
                          Boolean(formik.errors.addressNote)
                        }
                        helperText={
                          Boolean(formik.errors) && formik.errors.addressNote
                        }
                        InputProps={{
                          className: "rounded-lg",
                        }}
                        name={"addressNote"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </Box>
                    <Box className="w-full">
                      <p className="font-medium text-base text-slate-600 font-sans pb-2">
                        Nomor Telepon
                      </p>
                      <TextField
                        fullWidth
                        placeholder="081234567890"
                        value={formik.values.phoneNumber}
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        InputProps={{
                          className: "rounded-lg",
                        }}
                        helperText={
                          Boolean(formik.errors) && formik.errors.phoneNumber
                        }
                        name={"phoneNumber"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </Box>
                    <Box className="w-full">
                      <p className="font-medium text-base text-slate-600 font-sans pb-2">
                        Alamat Email
                      </p>
                      <TextField
                        fullWidth
                        placeholder="emailanda@nama-perusahaan.co.id"
                        required
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={
                          Boolean(formik.touched.email) && formik.errors.email
                        }
                        value={formik.values.email}
                        name={"email"}
                        onBlur={formik.handleBlur}
                        disabled
                        onChange={formik.handleChange}
                      />
                    </Box>
                  </>
                )}
              </div>
              <Divider />
              <div className="space-y-4 md:space-y-0 md:flex md:gap-4 items-center">
                <Button
                  variant="contained"
                  className={`capitalize md:order-2 py-4 ${
                    singleProduct?.category == "03" ? "text-base" : "text-lg"
                  }`}
                  fullWidth
                  disabled={formik.isSubmitting || !formik.isValid}
                  onClick={formik.submitForm}
                >
                  {singleProduct?.category == "03" ? "Minta Penawaran" : "Beli"}
                  {formik.isSubmitting && <CircularProgress size={10} />}
                </Button>
                <Button
                  variant="outlined"
                  className={`capitalize md:order-1 py-4 ${
                    singleProduct?.category == "03" ? "text-base" : "text-lg"
                  }`}
                  fullWidth
                  onClick={() => {
                    router.back();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
