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
            Lorem ipsum dolor sit amet consectetur. In enim elementum tellus
            adipiscing lorem. At enim eget sit donec. Pellentesque lorem in
            viverra amet aliquam potenti nullam porta. Cras neque condimentum
            fringilla sit purus vitae. Tellus convallis tristique purus mattis
            purus purus sagittis egestas. Augue enim dis lectus tempor praesent.
            Ultrices in nunc mi egestas adipiscing est viverra. Dignissim duis
            orci sagittis et. Porttitor sed neque tincidunt euismod.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GarapinFAQ;
