import GarapinAppBar from "@/components/GarapinAppBar";
import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import Image from "next/image";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { FacebookIconSVG } from "@/assets/icons/facebook-icon";
import { GoogleIconSVG } from "@/assets/icons/google-icon";

const useStyles = makeStyles((theme: Theme) => ({
  loginUi: {
    height: "100vh",
    minHeight: "100vh",
  },
  carousel: {
    height: "calc(100vh - 85px)",
    maxHeight: "calc(100vh - 85px)",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const auth = useFirebaseAuth();
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

  // make use of formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const redirect = localStorage.getItem("redirect");
      try {
        const res: any = await auth.signInWithEmailAndPassword(
          values.email,
          values.password
        );
        if (res) {
          setTimeout(() => {
            router.push(redirect ?? "/");
          }, 200);
        }
      } catch (error: any) {
        console.log("there's an error: ", error);
        formik.setErrors({ email: error.message });
      } finally {
        localStorage.removeItem("redirect");
      }
    },
  });

  const { t } = useTranslation("auth");

  return (
    <Box className={`${classes.loginUi} mx-auto md:mx-0`}>
      <div className="md:grid grid-cols-12">
        <div className="hidden md:block md:col-span-6 relative">
          <img
            src="/assets/auth-bg.png"
            alt="garapin"
            className="absolute w-full h-full opacity-60"
          />
          <div className="absolute top-0 left-0 bg-purple-800/60 h-full w-full flex items-center justify-center">
            <Box className="text-white space-y-4 max-w-md">
              <p>SELAMAT DATANG DI</p>
              <img
                src="/garapin_logo_white.svg"
                alt="garapin"
                className="max-w-[340px]"
              />
              <p className="leading-6">
                Tempat mencari packaging terbaik di indonesia untuk barang
                barang kebutuhan anda.
              </p>
            </Box>
          </div>
        </div>
        <div className="md:col-span-6 lg:min-w-[600px] lg:max-w-xl lg:mx-auto">
          <Paper className="lg:shadow-none">
            <Box
              className={`${classes.loginUi} flex flex-row flex-grow items-start md:items-center md:justify-center`}
            >
              <Box className="w-full bg-white py-10 px-4 space-y-4">
                <Image
                  src="/garapin-logo-colored.png"
                  alt="login-bg"
                  width={200}
                  height={50}
                  className="w-[85px] h-[25px] lg:w-[200px] lg:h-[55px]"
                />
                <Box className="space-y-4 lg:pt-6">
                  <Typography variant="h5">{t("login.title")}</Typography>
                  <Typography variant="subtitle1" className="text-slate-500">
                    {t("login.subtitle")}
                  </Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                  <Box className="flex flex-col justify-center items-center space-y-4">
                    <Box className="w-full">
                      <p className="font-medium text-base text-slate-500 font-sans pb-2">
                        Email
                      </p>
                      <TextField
                        variant="outlined"
                        id="email"
                        name="email"
                        fullWidth
                        placeholder="Masukkan Email Anda"
                        onChange={formik.handleChange}
                        InputProps={{
                          className: "rounded-lg p-2",
                        }}
                        value={formik.values.email}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Box>
                    <Box className="w-full">
                      <p className="font-medium text-base text-slate-500 font-sans pb-2">
                        Password
                      </p>
                      <TextField
                        type="password"
                        name="password"
                        placeholder="Masukan Password Anda"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          className: "rounded-lg p-2",
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
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
                        {t("login.button.submit")}{" "}
                        {formik.isSubmitting && (
                          <CircularProgress
                            color="secondary"
                            size={10}
                            sx={{ ml: 2 }}
                          />
                        )}
                      </Button>
                    </Box>
                  </Box>
                </form>
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="text-center text-base text-slate-500"
                  >
                    {t("login.registerCopy.title")}{" "}
                    <Link href="/register" className="text-[#713F97]">
                      {t("login.registerCopy.link")}
                    </Link>
                  </Typography>
                  <div className="relative">
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
                  </div>
                </Box>
              </Box>
            </Box>
          </Paper>
        </div>
      </div>
    </Box>
  );
};

LoginPage.authGuard = false;
LoginPage.guestGuard = true;
LoginPage.showFooter = false;
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
