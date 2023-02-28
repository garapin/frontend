import LoginPage from "@/pages/login";
import React, { useEffect } from "react";
import {Box, Button, Divider, Typography} from "@mui/material";
import GarapinAppBar from "@/components/GarapinAppBar";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import FallbackSpinner from "@/components/spinner";
import { getSingleProduct } from "@/store/modules/products";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProductDetailPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { slug } = router.query;
    const {isProductLoading, singleProduct} = useAppSelector(state => state.products);

    console.log("SLUG:", slug);
    useEffect(() => {
        if(slug !== undefined) {
            dispatch(getSingleProduct(slug as string));
        }
    }, [slug])
    

    if (isProductLoading) {
        return <FallbackSpinner />
    } else {
        return (
        <Box className="flex flex-col items-center">
            <GarapinAppBar searchVariant={true}/>
            <Box className="flex flex-row pt-20 md:px-72 justify-between">
                <Box className="rounded-xl">
                    <img className="w-80 h-80" src="https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg" alt="Image with stock photos"/>
                </Box>
                <Box className="flex flex-col pl-20 w-full">
                    <Typography className="pt-10" variant="h4">{singleProduct?.productName}</Typography>
                    <Typography className="pt-2" variant="h5" color="#713F97">Rp {singleProduct?.minPrice?.toLocaleString('id-ID')} - Rp {singleProduct?.maxPrice?.toLocaleString('id-ID')} / pcs</Typography>
                    <Box className="flex flex-row p-4 mt-6" sx={{ borderRadius: '10px', backgroundColor: '#FADEFF'}}>
                        <img src="/warning_icon.svg" alt="icon warning"/>
                        <Typography className="pl-4">Harga yang tertera merupakan estimasi dan dapat berubah sesuai kebutuhan atau permintaan yang diajukan</Typography>
                    </Box>
                    <Box className="flex flex-col">
                        <Box className="flex flex-row items-center justify-between pt-6">
                            <Typography variant="body2">Min. Pemesananan</Typography>
                            <Typography variant="body1"><b>{singleProduct?.moq?.toLocaleString('id-ID')} pcs</b></Typography>
                        </Box>
                        <Divider className="pt-2"/>
                        <Box className="flex flex-row items-center justify-between pt-2">
                            <Box className="flex flex-row items-center">
                                <Typography className="mr-2" variant="body2">Lama Pengerjaan</Typography>
                                <img className="w-3 h-3" src="/warning_icon.svg" alt="icon warning"/>
                            </Box>
                            <Typography variant="body1"><b>{singleProduct?.leadTime} hari</b></Typography>
                        </Box>
                        <Divider className="pt-2"/>
                        {/* <Box className="flex flex-row items-center justify-between pt-2">
                            <Typography variant="body2">Dikirim dari</Typography>
                            <Typography variant="body1"><b>{}</b></Typography>
                        </Box> */}
                        <Divider className="pt-2"/>
                        <Button className="my-10 w-fit" variant="contained" sx={{backgroundColor: '#713F97', color: 'white'}}>Minta Penawaran</Button>
                        <Divider className="pt-2"/>
                        <Box>
                            <Typography className="pt-16" color="#7C7C7C" variant="h5">Tentang Produk</Typography>
                            <Typography className="pt-6" color="#3A3A3A" variant="body2">{singleProduct?.description}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="py-20">
                <img src="/banner_inquiry.svg" alt="banner inquiry"/>
            </Box>
        </Box>
    ) }
}

LoginPage.authGuard = false;
LoginPage.guestGuard = false;

export default ProductDetailPage;

export const getServerSideProps = async ({locale}: { locale: string }) => {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ['products', 'common']))
        }
    }
};