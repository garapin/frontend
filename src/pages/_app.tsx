import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Head from "next/head";
import { CssBaseline, PaletteColorOptions } from '@mui/material';
import { appWithTranslation } from 'next-i18next'
import LandingPage from "@/pages/index";
import { Suspense, ReactNode, useEffect } from 'react';
import { FirebaseAuthProvider } from '@/context/FirebaseContext';
import GuestGuard from '@/components/auth/GuestGuard';
import AuthGuard from '@/components/auth/AuthGuard';
import { NextPage } from 'next';
import Spinner from '@/components/spinner';
import { wrapper } from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GarapinAppBar from '@/components/GarapinAppBar';
import GarapinFooter from '@/components/GarapinFooter';
import FirestoreLoader from '@/components/FirestoreLoader';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

const garapinTheme = createTheme({
    spacing: [0, 4, 8, 16, 32, 64],
    typography: {
        fontFamily: 'Roboto, Arial',
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#713F97',
        },
        secondary: {
            main: '#F7F4F9',
        },
        'garapinColor': createColor('#713F97'),
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

declare module '@mui/material/styles' {
    interface CustomPalette {
      garapinColor: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
  }
  
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      garapinColor: true;
    }
  }

type ExtendedAppProps = AppProps & {
    Component: NextPage
  }
  
type GuardProps = {
    authGuard: boolean
    guestGuard: boolean
    children: ReactNode
  }

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
    if (guestGuard) {
      console.log('Guest guard!')
  
      return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    } else if (!guestGuard && !authGuard) {
      console.log('not guest and not auth!')
  
      return <>{children}</>
    } else {
      console.log('auth guard!')
  
      return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    }
  }

const GarapinApp = (props: ExtendedAppProps) => {
    const { Component, pageProps } = props

    const authGuard = Component.authGuard ?? false

    const guestGuard = Component.guestGuard ?? false

    const showFooter = Component.showFooter ?? true
    const showAppBar = Component.showAppBar ?? true    

    return <>
          <Head>
              <title>Garapin</title>
              <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>
          <FirebaseAuthProvider>
              <Guard authGuard={authGuard} guestGuard={guestGuard}>
                  <ThemeProvider theme={garapinTheme}>
                      <Suspense fallback={<div>Loading...</div>}>
                          {showAppBar && <GarapinAppBar /> }
                              {/* <FirestoreLoader /> */}
                            <Component {...pageProps}/>
                            {showFooter && <GarapinFooter /> }
                          <ToastContainer />
                      </Suspense>
                  </ThemeProvider>
              </Guard>
          </FirebaseAuthProvider>
    </>
}


export default wrapper.withRedux(appWithTranslation(GarapinApp));
