import LoginPage from "@/pages/login";
import React from "react";
import {Box, Button, Divider, Typography} from "@mui/material";
import GarapinAppBar from "@/components/GarapinAppBar";

const ProductDetailPage = () => {
    return (
        <Box className="flex flex-col items-center">
            <GarapinAppBar searchVariant={true}/>
            <Box className="flex flex-row pt-20 md:px-72 justify-between">
                <Box className="rounded-xl">
                    <img className="w-80 h-80" src="https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg" alt="Image with stock photos"/>
                </Box>
                <Box className="flex flex-col pl-20 w-full">
                    <Typography className="pt-10" variant="h4">Sepatu Canvas</Typography>
                    <Typography className="pt-2" variant="h5" color="#713F97">Rp 50.000 - Rp 100.000 / pcs</Typography>
                    <Box className="flex flex-row p-4 mt-6" sx={{ borderRadius: '10px', backgroundColor: '#FADEFF'}}>
                        <img src="/warning_icon.svg" alt="icon warning"/>
                        <Typography className="pl-4">Harga yang tertera merupakan estimasi dan dapat berubah sesuai kebutuhan atau permintaan yang diajukan</Typography>
                    </Box>
                    <Box className="flex flex-col">
                        <Box className="flex flex-row items-center justify-between pt-6">
                            <Typography variant="body2">Min. Pemesananan</Typography>
                            <Typography variant="body1"><b>12 pcs</b></Typography>
                        </Box>
                        <Divider className="pt-2"/>
                        <Box className="flex flex-row items-center justify-between pt-2">
                            <Box className="flex flex-row items-center">
                                <Typography className="mr-2" variant="body2">Lama Pengerjaan (per karton)</Typography>
                                <img className="w-3 h-3" src="/warning_icon.svg" alt="icon warning"/>
                            </Box>
                            <Typography variant="body1"><b>10 hari</b></Typography>
                        </Box>
                        <Divider className="pt-2"/>
                        <Box className="flex flex-row items-center justify-between pt-2">
                            <Typography variant="body2">Dikirim dari</Typography>
                            <Typography variant="body1"><b>Jawa Tengah</b></Typography>
                        </Box>
                        <Divider className="pt-2"/>
                        <Button className="my-10 w-fit" variant="contained" sx={{backgroundColor: '#713F97', color: 'white'}}>Minta Penawaran</Button>
                        <Divider className="pt-2"/>
                        <Box>
                            <Typography className="pt-16" color="#7C7C7C" variant="h5">Tentang Produk</Typography>
                            <Typography className="pt-6" color="#3A3A3A" variant="body2">Lorem ipsum dolor sit amet consectetur. Euismod cursus ullamcorper malesuada pellentesque ligula quam adipiscing tincidunt. Turpis interdum mattis egestas volutpat quis a. Mattis quis suspendisse sapien interdum enim sed sociis sit amet. Massa augue ut vulputate fringilla nunc. Leo proin in etiam risus diam. Cursus morbi faucibus venenatis sed sed dui eu odio sit. Lacus non id ultrices sem. Magna non orci faucibus amet suspendisse arcu. Id venenatis quis varius velit ultricies ac laoreet dui. Sed arcu laoreet in eget morbi. Adipiscing viverra consequat pulvinar vitae varius blandit id nibh curabitur. Ultrices in massa egestas enim ac egestas id ornare dapibus. Augue ullamcorper id nullam adipiscing viverra id ut. Purus eros eu eget adipiscing facilisis tempus at pellentesque. Elementum sed phasellus lorem egestas egestas ac convallis consectetur consequat. Ultricies lobortis commodo placerat nulla at. Malesuada elit a purus eu eget at etiam. Nisl consectetur massa vel lectus malesuada. Egestas non dui et eget cursus turpis pharetra. In egestas velit ac facilisi egestas. Est at rhoncus malesuada placerat ac natoque. Accumsan et nunc a vitae nibh posuere enim. Nisl felis nunc sodales velit lectus morbi semper duis et. Praesent viverra integer ornare lobortis id sit sit. Varius elementum dis maecenas fermentum porta. Quis arcu augue mattis interdum. Pharetra ac eu vulputate lorem enim orci odio a suspendisse. Maecenas amet amet massa etiam. Felis nec est sit sit. Augue tortor mi senectus mi ornare lacus curabitur ullamcorper amet. Nunc pellentesque fringilla tincidunt non phasellus pellentesque. Morbi ut nunc in tellus convallis mi cras elementum purus. Tristique consequat at neque amet integer nisl gravida. Mi sodales est libero interdum dapibus sagittis dui purus mauris. Amet lacus lectus sed eros scelerisque ut faucibus nisi. Metus nunc ante eget morbi eget et. Tristique dictum mattis tortor amet ullamcorper. Elementum suspendisse porttitor vel ridiculus amet in est integer integer. Consequat ut at tempus mauris tellus dolor neque et vitae. Tempor lectus felis phasellus tincidunt at sit. Fusce etiam euismod interdum tincidunt integer id viverra lectus. Facilisis interdum augue ac sed. Sit et adipiscing tempus dui urna. At ultrices vestibulum scelerisque felis etiam egestas aliquam. Amet dapibus lectus hendrerit nulla libero. Suspendisse elit sed iaculis sit in vulputate non. Gravida.</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="py-20">
                <img src="/banner_inquiry.svg" alt="banner inquiry"/>
            </Box>
        </Box>
    )
}

LoginPage.authGuard = false;
LoginPage.guestGuard = true;

export default ProductDetailPage;