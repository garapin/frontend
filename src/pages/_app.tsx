import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Head from "next/head";

const garapinTheme = createTheme({
    typography: {
        fontFamily: 'Arial',
    },
    palette: {
        primary: {
            main: '#ff5733',
        },
        secondary: {
            main: '#33e6ff',
        },
    },
});

export default function App({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <title>Garapin</title>
        </Head>
        <ThemeProvider theme={garapinTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </>
}
