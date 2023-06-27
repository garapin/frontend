import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { color } from "@mui/system";
import { useTranslation, withTranslation, WithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormControl, NativeSelect } from "@mui/material";
import { useRouter } from "next/router";

interface Props extends WithTranslation {}
const GarapinFooter: React.FC<Props> = ({ t }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const switchToLocale = React.useCallback(
    (locale: string) => {
      const path = router.asPath;

      return router.push(path, path, { locale });
    },
    [router]
  );
  return (
    <Box
      className="flex flex-col md:flex-row justify-around p-10"
      sx={{ backgroundColor: "#713F97" }}
    >
      <Box
        className="block md:hidden mb-4"
      >
        <Box className="w-32 bg-white rounded pl-2">
          <FormControl fullWidth>
            <NativeSelect
              disableUnderline={true}
              value={i18n.resolvedLanguage}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={(e) => switchToLocale(e.target.value as string)}
            >
              <option value={"id"} disabled={i18n.resolvedLanguage === "id"}>
                Indonesia
              </option>
              <option value={"en"} disabled={i18n.resolvedLanguage === "en"}>
                English
              </option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
      <Box className="flex flex-col max-w-sm pb-8">
        <Typography variant="h5" className="pb-3 text-white">
          {t("footer.excerpt.header")}
        </Typography>
        <Typography variant="body2" className="pb-3 text-white">
          {t("footer.excerpt.content")}
        </Typography>
        <Typography variant="h5" className="pb-3 text-white">
          PT Visi Teknologi Digital
        </Typography>
        <Typography variant="body2" className="text-white">
          Gd Grand Slipi Tower 5th Fl Unit F
        </Typography>
        <Typography variant="body2" className="text-white">
          Jl Letjen S Parman Kav 22-24. Palmerah
        </Typography>
        <Typography variant="body2" className="pb-3 text-white">
          Jakarta Barat 11480. Indonesia.
        </Typography>
        <Typography variant="h5" className="pb-3 text-white">
          {t("footer.pse.header")}
        </Typography>
        <Typography variant="body2" className="text-white">
          000205.01/DJAI.PSE/02/2021
        </Typography>
      </Box>
      <Box className="flex flex-col">
        <Typography variant="h5" className="pb-3 text-white">
          {t("footer.socials.header")}
        </Typography>
        <Box className="flex flex-row justify-around pb-3">
          <img src="/instagram_icon.svg" alt="Instagram Icon" />
          <img src="/youtube_icon.svg" alt="Youtube Icon" />
          <img src="/facebook_icon.svg" alt="Facebook Icon" />
          <img src="/linkedin_icon.svg" alt="Linkedin Icon" />
        </Box>
        <Typography variant="h5" className="pb-3 text-white">
          {t("footer.contact.header")}
        </Typography>
        <Box className="flex flex-row justify-between pb-3 text-white">
          <Typography variant="body2">contact@garap.in</Typography>
          <img src="/mail_icon.svg" alt="Email Icon" />
        </Box>
        <Box className="flex flex-row justify-between pb-3 text-white">
          <Typography variant="body2">0813-8020-6100 (Customer)</Typography>
          <img src="/whatsapp_icon.svg" alt="Whatsapp Icon" />
        </Box>
        <Box className="flex flex-row justify-between pb-3 text-white">
          <Typography variant="body2">0821-3758-5330 (Mitra)</Typography>
          <img src="/whatsapp_icon.svg" alt="Whatsapp Icon" />
        </Box>
      </Box>
      <Box className="hidden md:block">
        <img src="/garapin_logo_white.svg" alt="Garapin Logo" width="400" />
      </Box>
    </Box>
  );
};

export default withTranslation("common")(GarapinFooter);
