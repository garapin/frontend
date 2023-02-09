import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import * as React from "react";
import {color} from "@mui/system";

export default function GarapinFooter() {
    return (
        <Box className="flex flex-row justify-around p-10" sx={{backgroundColor: '#713F97'}}>
            <Box className="flex flex-col max-w-sm">
                <Typography variant="h5" className="pb-3">
                    Apa Sih Garapin?
                </Typography>
                <Typography variant="body2" className="pb-3">
                    Garapin adalah sebuah aplikasi mobile atau platform digital yang membantu para produsen dan maklon untuk mendapatkan customer yang ingin memproduksi sebuah barang melalui pabrik dan produsen yang terpercaya dengan quantity yang terjangkau oleh customer.
                </Typography>
                <Typography variant="h5" className="pb-3">
                    PT Visi Teknologi Digital
                </Typography>
                <Typography variant="body2">
                    Gd Grand Slipi Tower 5th Fl Unit F
                </Typography>
                <Typography variant="body2">
                    Jl Letjen S Parman Kav 22-24. Palmerah
                </Typography>
                <Typography variant="body2" className="pb-3">
                    Jakarta Barat 11480. Indonesia.
                </Typography>
                <Typography variant="h5" className="pb-3">
                    Tanda Daftar PSE
                </Typography>
                <Typography variant="body2">
                    000205.01/DJAI.PSE/02/2021
                </Typography>
            </Box>
            <Box className="flex flex-col">
                <Typography variant="h5" className="pb-3">
                    Temukan di Media Sosial:
                </Typography>
                <Box className="flex flex-row justify-around pb-3">
                    <img src="/instagram_icon.svg" alt="Instagram Icon"/>
                    <img src="/youtube_icon.svg" alt="Youtube Icon"/>
                    <img src="/facebook_icon.svg" alt="Facebook Icon"/>
                    <img src="/linkedin_icon.svg" alt="Linkedin Icon"/>
                </Box>
                <Typography variant="h5" className="pb-3">
                    Hubungi Kami:
                </Typography>
                <Box className="flex flex-row justify-between pb-3">
                    <Typography variant="body2">contact@garap.in</Typography>
                    <img src="/mail_icon.svg" alt="Email Icon"/>
                </Box>
                <Box className="flex flex-row justify-between pb-3">
                    <Typography variant="body2">0813-8020-6100 (Customer)</Typography>
                    <img src="/whatsapp_icon.svg" alt="Whatsapp Icon"/>
                </Box>
                <Box className="flex flex-row justify-between pb-3">
                    <Typography variant="body2">0821-3758-5330 (Mitra)</Typography>
                    <img src="/whatsapp_icon.svg" alt="Whatsapp Icon"/>
                </Box>
            </Box>
            <Box>
                <img src="/garapin_logo_white.svg" alt="Garapin Logo" width="400"/>
            </Box>
        </Box>
    );
}