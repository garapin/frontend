import { FacebookIconSVG } from "@/assets/icons/facebook-icon";
import { GoogleIconSVG } from "@/assets/icons/google-icon";
import GarapinAppBar from "@/components/GarapinAppBar";
import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import { getFirestore } from "@/configs/firebase";
// import { firestore } from "@/configs/firebase";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  loginUi: {
    height: "calc(100vh - 64px)",
    minHeight: "calc(100vh - 64px)",
    // height: '100vh',
    // minHeight: '100vh',
  },
  carousel: {
    height: "calc(100vh - 85px)",
    maxHeight: "calc(100vh - 85px)",
    // height: 'calc(100vh - 20px)',
    // maxHeight: 'calc(100vh - 20px)',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const auth = useFirebaseAuth();
  const firestore = getFirestore();

  const imageSet: CarouselImageSet[] = [
    {
      srcUrl:
        "https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      srcUrl:
        "https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const baseDataFormik = {
    namaLengkap: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
    nomorHp: "",
    // namaPerusahaan: "",
    // liniBisnis: "",
    // liniBisnisOtherVal: "",
  };

  const liniBisnis = [
    "Food & Beverages",
    "Fashion",
    "Health & Beauty",
    "Furniture, Home, Living",
    "Travel & Leisure",
    "Entertainment",
    "Education",
    "Automotive",
    "Technology",
    "Lainnya",
  ];

  // make use of formik
  const formik = useFormik({
    initialValues: baseDataFormik,
    validationSchema: Yup.object({
      namaLengkap: Yup.string().required("Nama lengkap harus diisi"),
      email: Yup.string()
        .email("Alamat email tidak valid")
        .required("Alamat email harus diisi"),
      password: Yup.string()
        .required("Password harus diisi")
        .min(8, "Password minimal 8 karakter"),
      //konfirmasiPassword is Password confirmation, must be same with password.
      konfirmasiPassword: Yup.string()
        .required("Konfirmasi password harus diisi")
        .oneOf([Yup.ref("password"), ""], "Password harus sama"),
      nomorHp: Yup.string().required("Nomor HP harus diisi"),
      // namaPerusahaan: Yup.string(),
      // liniBisnis: Yup.string(),
      // liniBisnisOtherVal: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const user = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        if (user) {
          await user.user?.updateProfile({ displayName: values.namaLengkap });
          await user.user?.sendEmailVerification({
            url: `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/?verified=true`,
          });
          await user.user?.reload();
        }
        const objFirebase: any = { ...values };

        delete objFirebase.password;
        delete objFirebase.konfirmasiPassword;
        objFirebase["isCustomer"] = true;
        objFirebase["isPrinting"] = true;
        objFirebase["createdAt"] = new Date();
        await firestore
          .collection("usersData")
          .doc(user.user?.uid)
          .set(objFirebase);
        toast.success("Registrasi Akun berhasil");
      } catch (error: any) {
        console.log("there's an error: ", error);
        formik.setErrors({ email: error.message });
      }
    },
  });

  const { t } = useTranslation("auth");

  return (
    <Box className={`max-w-md mx-auto md:${classes.loginUi}`}>
      <Paper>
        <Box className="flex flex-col justify-center h-full py-10 px-4 space-y-4">
          <Box className="flex flex-col justify-center space-y-4">
            <Typography variant="h5">{t("register.title")}</Typography>
            <Typography variant="subtitle1">
              {t("register.subtitle")}
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box className="flex flex-col justify-center items-center space-y-4">
              <Box className="w-full">
                <p className="font-medium text-base text-slate-500 font-sans pb-2">
                  {t("register.fields.namaLengkap")}
                </p>
                <TextField
                  variant="outlined"
                  name="namaLengkap"
                  placeholder="Masukan Nama Lengkap Anda"
                  fullWidth
                  onChange={formik.handleChange}
                  required
                  value={formik.values.namaLengkap}
                  error={
                    formik.touched.namaLengkap &&
                    Boolean(formik.errors.namaLengkap)
                  }
                  helperText={
                    formik.touched.namaLengkap && formik.errors.namaLengkap
                  }
                  InputProps={{
                    className: "rounded-lg p-2",
                  }}
                />
              </Box>
              <Box className="w-full">
                <p className="font-medium text-base text-slate-500 font-sans pb-2">
                  {t("register.fields.email")}
                </p>
                <TextField
                  placeholder="Masukan Email Anda"
                  variant="outlined"
                  name="email"
                  fullWidth
                  onChange={formik.handleChange}
                  required
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    className: "rounded-lg p-2",
                  }}
                />
              </Box>
              <Box className="w-full">
                <p className="font-medium text-base text-slate-500 font-sans pb-2">
                  {t("register.fields.password")}
                </p>
                <TextField
                  placeholder="Masukan Password Anda"
                  type="password"
                  name="password"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  required
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    className: "rounded-lg p-2",
                  }}
                />
              </Box>
              <Box className="w-full">
                <p className="font-medium text-base text-slate-500 font-sans pb-2">
                  {t("register.fields.password_confirmation")}
                </p>
                <TextField
                  placeholder="Masukan Ulang Password Anda"
                  type="password"
                  name="konfirmasiPassword"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  required
                  value={formik.values.konfirmasiPassword}
                  error={
                    formik.touched.konfirmasiPassword &&
                    Boolean(formik.errors.konfirmasiPassword)
                  }
                  helperText={
                    formik.touched.konfirmasiPassword &&
                    formik.errors.konfirmasiPassword
                  }
                  InputProps={{
                    className: "rounded-lg p-2",
                  }}
                />
              </Box>
              <Box className="w-full">
                <p className="font-medium text-base text-slate-500 font-sans pb-2">
                  {t("register.fields.nomorHp")}
                </p>
                <TextField
                  placeholder="Masukan Nomor Telepon Anda"
                  variant="outlined"
                  name="nomorHp"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.nomorHp}
                  error={
                    formik.touched.nomorHp && Boolean(formik.errors.nomorHp)
                  }
                  required
                  helperText={formik.touched.nomorHp && formik.errors.nomorHp}
                  InputProps={{
                    className: "rounded-lg p-2",
                  }}
                />
              </Box>
              <Box className="w-full pt-2">
                <Button
                  variant="contained"
                  fullWidth
                  color="garapinColor"
                  style={{
                    backgroundColor: "#713F97",
                    color: "#ffffff",
                  }}
                  className="rounded-lg py-4"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t("register.button.submit")}{" "}
                  {formik.isSubmitting && (
                    <CircularProgress
                      size={10}
                      color="secondary"
                      sx={{ ml: 2 }}
                    />
                  )}
                </Button>
              </Box>
            </Box>
          </form>
          <Box className="text-center">
            <Typography
              variant="subtitle1"
              className="text-center text-base text-slate-500"
            >
              {t("register.loginCopy.title")}{" "}
              <Link href="/login" className="text-[#713F97]">
                {t("register.loginCopy.link")}
              </Link>
            </Typography>
            {/* <div className="relative">
              <Divider className="my-6" />
              <span className="absolute px-8 py-2 bg-white -top-4 left-1/2 -translate-x-1/2 font-sans">
                Or
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="p-4 rounded-lg shadow-lg cursor-pointer">
                <GoogleIconSVG />
              </div>
              <div className="p-4 rounded-lg shadow-lg cursor-pointer">
                <FacebookIconSVG />
              </div>
            </div> */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

LoginPage.authGuard = false;
LoginPage.guestGuard = true;
LoginPage.showAppBar = false;

export default LoginPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
};
