import Head from "next/head";
import GarapinAppBar from "@/components/GarapinAppBar";
import {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import GarapinFooter from "@/components/GarapinFooter";
import Typography from "@mui/material/Typography";
import RoundedImage from "@/components/RoundedImage";
import * as React from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import CardVertical from "@/components/CardVertical";

const Register = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.8),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: '#713F97',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 3),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50ch',
        },
    },
}));

const useStyles = makeStyles({
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '50%',
      },
    card: {
      width: '25%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '1%',
    },
  });
  

  const productData = [
    {
        id: 1,
        name: 'Product 1',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 3,
        name: 'Product 3',
        price: 30000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 4,
        name: 'Product 4',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 5,
        name: 'Product 5',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 6,
        name: 'Product 6',
        price: 30000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 7,
        name: 'Product 7',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 8,
        name: 'Product 8',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 9,
        name: 'Product 9',
        price: 30000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 10,
        name: 'Product 10',
        price: 30000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
];


export default function LandingPage() {

    const {t} = useTranslation('landing');
    const styles = useStyles();

    const databanyak =[1,2,3,4,5];

    return (
        <>
            <Head>
                <title>Garapin</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Box className="flex flex-col">
                    <GarapinAppBar/>
                    <Box className="flex flex-col items-center justify-between pt-20 pb-20"
                         sx={{backgroundColor: '#F8F4F9'}}>
                            {/* <Trans t={t} i18nKey={'section2.header'}> */}
                                <Typography variant="h4" color="#713F97" className="pb-20" fontWeight="bold">{t('section2.header')}</Typography>
                            {/* </Trans> */}
                        <Box className="flex flex-row justify-around pl-96 pr-96">
                            <Box className="flex flex-col items-center justify-center" sx={{width: 200}}>
                                <RoundedImage
                                    src="https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg"
                                    alt="Rounded Image"/>
                                <Typography variant="h5" color="text.primary" className="pt-3"
                                            fontWeight="bold">{t('section2.content.step1.header')}</Typography>
                                <Typography variant="body1" color="text.primary" align="center">{t('section2.content.step1.content')}</Typography>
                            </Box>
                            <Box className="flex flex-col items-center justify-center" sx={{width: 200}}>
                                <RoundedImage
                                    src="https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg"
                                    alt="Rounded Image"/>
                                <Typography variant="h5" color="text.primary" className="pt-3"
                                            fontWeight="bold">{t('section2.content.step2.header')}</Typography>
                                <Typography variant="body1" color="text.primary" align="center">{t('section2.content.step2.content')}</Typography>
                            </Box>
                            <Box className="flex flex-col items-center justify-center" sx={{width: 200}}>
                                <RoundedImage
                                    src="https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg"
                                    alt="Rounded Image"/>
                                <Typography variant="h5" color="text.primary" className="pt-3"
                                            fontWeight="bold">{t('section2.content.step3.header')}</Typography>
                                <Typography variant="body1" color="text.primary" align="center">{t('section2.content.step3.content')}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="flex md:flex-row items-center justify-between pt-20 pb-20 pl-80 pr-80"
                         sx={{backgroundColor: '#F8F4F9'}}>
                        <img
                            src="https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg"
                            alt="Image with stock photos"/>
                        <Box className="max-w-sm">
                            <Typography variant="h4" color="#713F97" fontWeight="bold" className="pb-5">{t('section3.header')}</Typography>
                            <Typography variant="body1" color="text.primary">{t('section3.content')}</Typography>
                        </Box>
                    </Box>
                    <Box className="flex flex-row items-center justify-between pt-20 pb-20 pl-80 pr-80"
                         sx={{backgroundColor: '#FFFFFF'}}>
                        <Box className="max-w-sm">
                            <Typography variant="h4" color="#713F97" fontWeight="bold" className="pb-5">{t('section4.header')}</Typography>
                            <Typography variant="body1" color="text.primary">{t('section4.content')}</Typography>
                        </Box>
                        <img src="/daily_social_logo.png" alt="Daily Social Logo"/>
                        <img src="/startup4industries_logo.png" alt="Startup 4 Industries Logo"/>
                    </Box>
                    <Box className={styles.cardContainer}>
                        {productData.map((product) => 
                                <CardVertical key={product.id} imageUrl={product.image} productName={product.name} price={`Rp${product.price}`} location="Jakarta" />
                            )}

                    </Box>
                    <Box className="flex flex-col items-center justify-around pt-20 pb-20 pl-80 pr-80"
                         sx={{backgroundColor: '#F8F4F9'}}>
                        <Typography variant="h4" color="#713F97" className="pb-20" fontWeight="bold">{t('section5.header')}</Typography>
                        <Typography variant="body1" color="text.primary" className="pb-20">{t('section5.content')}</Typography>
                        <Register>
                            <StyledInputBase
                                placeholder={t('section5.email')??undefined}
                                inputProps={{'aria-label': 'search'}}
                                onSubmit={(e) => {}}
                            />
                            <Button variant="contained" color="primary" className="ml-5">{t('section5.register')}</Button>
                        </Register>
                    </Box>
                    <GarapinFooter/>
                </Box>
            </main>
        </>
    )
}

export const getServerSideProps = async ({ locale }: {locale:string}) => ({
    props: {
            ...(await serverSideTranslations(locale, ['landing', 'common']))
        }
});