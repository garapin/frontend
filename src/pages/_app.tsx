import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Head from "next/head";
import { CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next'
import LandingPage from "@/pages/index";
import { Suspense } from 'react';

const garapinTheme = createTheme({
    spacing: [0, 4, 8, 16, 32, 64],
    typography: {
        fontFamily: 'Roboto, Arial',
    },
    palette: {
        primary: {
            main: '#713F97',
        },
        secondary: {
            main: '#F7F4F9',
        },
    },
});

const GarapinApp = ({Component, pageProps}: AppProps) => {
    return <>
        <Head>
            <title>Garapin</title>
        </Head>
        <ThemeProvider theme={garapinTheme}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...pageProps} />
            </Suspense>
        </ThemeProvider>
    </>
}

export default appWithTranslation(GarapinApp);