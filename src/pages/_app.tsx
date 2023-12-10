import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { CssBaseline, PaletteColorOptions } from "@mui/material";
import { appWithTranslation } from "next-i18next";
import LandingPage from "@/pages/index";
import { Suspense, ReactNode, useEffect, useState } from "react";
import { FirebaseAuthProvider } from "@/context/FirebaseContext";
import GuestGuard from "@/components/auth/GuestGuard";
import AuthGuard from "@/components/auth/AuthGuard";
import { NextPage } from "next";
import Spinner from "@/components/spinner";
import { wrapper } from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GarapinAppBar from "@/components/GarapinAppBar";
import GarapinFooter from "@/components/GarapinFooter";
import FirestoreLoader from "@/components/FirestoreLoader";
import { useRouter } from "next/router";
import AdminPanelLayout from "@/components/Admin/Layouts/AdminLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

const garapinTheme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
  typography: {
    fontFamily: "Archivo, Arial, Roboto",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#713F97",
    },
    secondary: {
      main: "#F7F4F9",
    },
    garapinColor: createColor("#713F97"),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

declare module "@mui/material/styles" {
  interface CustomPalette {
    garapinColor: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    garapinColor: true;
  }
}

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  adminGuard: boolean;
  children: ReactNode;
};

const Guard = ({ children, authGuard, guestGuard, adminGuard }: GuardProps) => {
  if (guestGuard) {
    console.log("Guest guard!");

    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    console.log("not guest and not auth!");

    return <>{children}</>;
  } else {
    console.log("auth guard!");

    return (
      <AuthGuard fallback={<Spinner />} adminGuard={adminGuard ?? false}>
        {children}
      </AuthGuard>
    );
  }
};

const GarapinApp = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();
  const isRouteAdmin = router.pathname.startsWith("/admin");

  const authGuard = Component.authGuard ?? false; // TODO: Add guard automatically for admin page
  const adminGuard = Component.adminGuard ?? false; // TODO: Add guard automatically for admin page

  const guestGuard = Component.guestGuard ?? false;

  const showFooter = Component.showFooter ?? true;
  const showAppBar = Component.showAppBar ?? true;

  return (
    <>
      <Head>
        <title>Heipack</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <FirebaseAuthProvider>
        <Guard
          authGuard={authGuard}
          guestGuard={guestGuard}
          adminGuard={adminGuard}
        >
          <ThemeProvider theme={garapinTheme}>
            <Suspense fallback={<div>Loading...</div>}>
              {showAppBar && <GarapinAppBar />}
              {/* <FirestoreLoader /> */}
              {isRouteAdmin ? (
                <AdminPanelLayout>
                  {" "}
                  {isClient && <Component {...pageProps} />}
                </AdminPanelLayout>
              ) : (
                <Component {...pageProps} />
              )}
              {showFooter && <GarapinFooter />}
              <ToastContainer />
            </Suspense>
          </ThemeProvider>
        </Guard>
      </FirebaseAuthProvider>
    </>
  );
};

export default wrapper.withRedux(appWithTranslation(GarapinApp));
