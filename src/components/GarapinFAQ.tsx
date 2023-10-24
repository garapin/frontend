import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GarapinFAQ = ({ className }: { className?: string }) => {
  const { t } = useTranslation("landing");
  return (
    <Box className={className}>
      <Accordion className="shadow-lg p-4" expanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="text-lg font-medium max-w-xs md:max-w-none lg:text-[30px]">
            Garapin, Pembuatan Packaging Terpercaya Di Indonesia
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Selamat datang di Garapin Packaging, mitra andal untuk kemasan
            makanan dan produk lainnya. Kami menawarkan solusi kemasan
            berkualitas tinggi dengan desain kreatif yang mencerminkan brand
            Anda. Keamanan dan ramah lingkungan adalah prioritas kami.
            <br />
            Dengan kemasan kami, Anda dapat meningkatkan daya tarik produk,
            melindungi barang-barang berharga, dan memberikan kesan positif pada
            pelanggan. Percayakan kemasan Anda pada kami untuk keberhasilan
            bisnis Anda. Hubungi kami hari ini untuk konsultasi gratis.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GarapinFAQ;
