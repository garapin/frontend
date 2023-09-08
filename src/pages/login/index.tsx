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
    height: "calc(100vh - 64px)",
    minHeight: "calc(100vh - 64px)",
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
    <Box className={`${classes.loginUi} max-w-md mx-auto`}>
      <Paper>
        <Box className={`${classes.loginUi} flex flex-row flex-grow`}>
          <Box className="w-full bg-white py-10 px-4 space-y-4">
            <Image
              src="/garapin-logo-colored.png"
              alt="login-bg"
              width={200}
              height={50}
              className="w-[85px] h-[25px]"
            />
            <Box className="space-y-4">
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
                    error={formik.touched.email && Boolean(formik.errors.email)}
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
                      formik.touched.password && Boolean(formik.errors.password)
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
    </Box>
    // <Box className={classes.loginUi}>
    //   <Paper>
    //     <GarapinAppBar searchVariant />
    //     <Box
    //       className={`${classes.loginUi} flex flex-row flex-grow`}
    //       style={{ marginTop: "64px" }}
    //     >
    //       <Box className="sm:w-0 md:w-2/3 sm:block hidden bg-gray-200 p-3">
    //         <ImageCarousel
    //           className={classes.carousel}
    //           dataSource={imageSet}
    //           maxWidth={2000}
    //           withThumbnail={false}
    //           rsProps={{ autoplay: true, autoplaySpeed: 5000, infinite: true }}
    //           useMagnifier={false}
    //           rimProps={{ className: classes.carousel }}
    //         />
    //       </Box>
    //       <Box className="sm:w-full lg:w-1/3 w-full bg-gray-100">
    //         <Box className="flex flex-col justify-center h-full">
    //           <Box
    //             className="flex flex-col justify-center items-center"
    //             sx={{ pb: 4 }}
    //           >
    //             <Typography variant="h5">{t("login.title")}</Typography>
    //             <Typography variant="subtitle1">
    //               {t("login.subtitle")}
    //             </Typography>
    //           </Box>
    //           <form onSubmit={formik.handleSubmit}>
    //             <Box className="flex flex-col justify-center items-center">
    //               <Box className="w-3/4 md:w-1/2 py-2">
    //                 <TextField
    //                   label={t("login.fields.email")}
    //                   variant="outlined"
    //                   name="email"
    //                   fullWidth
    //                   onChange={formik.handleChange}
    //                   value={formik.values.email}
    //                   error={
    //                     formik.touched.email && Boolean(formik.errors.email)
    //                   }
    //                   helperText={formik.touched.email && formik.errors.email}
    //                 />
    //               </Box>
    //               <Box className="w-3/4 md:w-1/2 py-2">
    //                 <TextField
    //                   label={t("login.fields.password")}
    //                   type="password"
    //                   name="password"
    //                   variant="outlined"
    //                   fullWidth
    //                   onChange={formik.handleChange}
    //                   value={formik.values.password}
    //                   error={
    //                     formik.touched.password &&
    //                     Boolean(formik.errors.password)
    //                   }
    //                   helperText={
    //                     formik.touched.password && formik.errors.password
    //                   }
    //                 />
    //               </Box>
    //               <Box className="w-3/4 md:w-1/2 py-2">
    //                 <Button
    //                   variant="contained"
    //                   fullWidth
    //                   color="garapinColor"
    //                   style={{
    //                     backgroundColor: "#713F97",
    //                     color: "#ffffff",
    //                   }}
    //                   type="submit"
    //                   disabled={formik.isSubmitting}
    //                 >
    //                   {t("login.button.submit")}{" "}
    //                   {formik.isSubmitting && (
    //                     <CircularProgress
    //                       color="secondary"
    //                       size={10}
    //                       sx={{ ml: 2 }}
    //                     />
    //                   )}
    //                 </Button>
    //               </Box>
    //             </Box>
    //           </form>
    //           <Box>
    //             <Typography
    //               variant="subtitle1"
    //               className="text-center"
    //               sx={{ pt: 4 }}
    //             >
    //               {t("login.registerCopy.title")}{" "}
    //               <Link href="/register" className="text-[#713F97]">
    //                 {t("login.registerCopy.link")}
    //               </Link>
    //             </Typography>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Paper>
    // </Box>
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
