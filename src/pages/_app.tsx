import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Head from "next/head";

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
