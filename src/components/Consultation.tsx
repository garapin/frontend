import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Consultation = ({ className }: { className?: string }) => {
  const { t } = useTranslation("landing");
  return (
    <Box
      className={`py-16 px-10 text-center space-y-4 bg-[#713F97] rounded-2xl text-white ${className}`}
    >
      <h2 className="font-normal text-[32px] max-w-sm text-center mx-auto">
        {t("section_consultation.title")}
      </h2>
      <p className="leading-6">{t("section_consultation.description")}</p>
      <Button
        variant="contained"
        className="text-[#713F97] bg-white capitalize"
        onClick={() => {
          window.open("https://wa.me/+6281380206100", "_blank");
        }}
      >
        {t("section_consultation.button")}
      </Button>
    </Box>
  );
};

export default Consultation;
