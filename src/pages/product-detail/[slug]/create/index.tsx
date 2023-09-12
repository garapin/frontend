import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { addToCart } from "@/db";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import {
  getCalculateProductPricing,
  getSingleProduct,
} from "@/store/modules/products";
import { getCategoryLabel } from "@/tools/utils";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
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
import { ProductType, StoragePath } from "@/types/product";

const index = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { singleProduct, templatePrice } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  const [itemQty, setItemQty] = React.useState<any>(
    singleProduct?.moq?.toString() ?? 0
  );
  const auth = useFirebaseAuth();
  const [fetchingPrice, setFetchingPrice] = React.useState(false);
  const templatePricingIdempotencyKey = React.useMemo(() => uuid(), []);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

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
      if (singleProduct.moq) {
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
    },
  });

  // console.log("singleProduct", singleProduct);

  if (!singleProduct || Array.isArray(singleProduct)) {
    return null;
  }

  const handleToLogin = () => {
    localStorage.setItem("redirect", router.asPath);
    router.push("/login");
  };

  const handleBuyRTB = async () => {
    if (auth.authUser === null) {
      handleOpenLogin();
      return;
    } else {
      formikRTB.handleSubmit();
    }
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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "24px",
    // before
    "&:before": {
      content: '""',
      position: "absolute" as "absolute",
      left: "0",
      top: "-10px",
      height: "48px",
      background: "#713F97",
      width: "100%",
      borderRadius: "24px 24px 0 0",
    },
    // after
    "&:after": {
      content: '""',
      position: "absolute" as "absolute",
      left: "0",
      top: "0",
      height: "48px",
      background: "white",
      width: "100%",
      borderRadius: "24px 24px 0 0",
    },
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-50">
      <div className="bg-white rounded-t-xl pt-8 px-6 space-y-6">
        <h2 className="text-[32px] font-semibold">
          {getCategoryLabel(singleProduct?.category)}
        </h2>
        <p className="text-slate-700">
          Anda mengajukan penawaran untuk produk berikut :
        </p>
        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <img
            src={singleProduct?.img[0] ?? imagePlaceholder}
            alt={singleProduct?.name}
            className="rounded-xl w-full aspect-auto object-contain"
          />
          <p className="text-[#713F97] font-semibold text-sm">
            {getCategoryLabel(singleProduct?.category)}
          </p>
          <p className="font-semibold">{singleProduct?.productName}</p>
          <div className="flex items-center gap-2 text-slate-700 font-light">
            <p className="font-semibold border-r-2 border-slate-700 text-sm">
              {templatePrice?.unitPrice?.toFixed(2)}
            </p>
            <p className="font-semibold border-slate-700 text-sm">|</p>
            <p className="font-semibold border-slate-700 text-sm">
              {itemQty} pcs
            </p>
          </div>
        </div>
        <Divider />
      </div>
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
            <Box className="flex items-center my-10 gap-2">
              <Button
                disabled={itemQty == 0}
                onClick={() => descButton(itemQty)}
                variant="contained"
                className="rounded-md p-2 max-w-[40px] h-[40px]"
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
                className="rounded-md p-2 max-w-[40px] h-[40px]"
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
            className="capitalize py-2 text-lg"
            fullWidth
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="capitalize py-2 text-lg"
            fullWidth
            disabled={fetchingPrice}
            onClick={handleBuyRTB}
          >
            Beli
          </Button>
        </div>
      </form>

      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="space-y-6 px-10 py-16">
          <h2 className="text-[40px] text-center max-w-xs font-medium pb-4">
            Ingin Memesan?
          </h2>
          <p className="text-slate-600 text-center max-w-xs pb-2 leading-5">
            Anda diharuskan untuk login/register terlebih dahulu jika ingin
            memesan produk kami
          </p>
          <Button
            variant="contained"
            className="py-3 text-lg font-normal capitalize"
            fullWidth
            onClick={() => router.push("/register")}
          >
            Daftar
          </Button>
          <Button
            variant="outlined"
            className="py-3 text-lg font-normal capitalize"
            fullWidth
            onClick={handleToLogin}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default index;
