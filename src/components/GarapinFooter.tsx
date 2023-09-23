import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { color } from "@mui/system";
import { useTranslation, withTranslation, WithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Divider, FormControl, Grid, NativeSelect } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { TiktokSocialIconSVG } from "@/assets/icons/tiktok-social-icon";
import { FacebookSocialIconSVG } from "@/assets/icons/facebook-social-icon";
import { InstagramSocialIconSVG } from "@/assets/icons/instagram-social-icon";
import { YoutubeSocialIconSVG } from "@/assets/icons/youtube-social-icon";

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
    <Box className="max-w-md mx-auto bg-[#713F97] py-10 space-y-6 px-4 font-sans text-slate-100">
      <div className="flex items-center justify-center">
        <Image
          src="/garapin_logo_white.svg"
          alt="Garapin Logo"
          width={400}
          height={100}
        />
      </div>
      <p className="font-light leading-7">
        Garapin is a mobile application or digital platform that assists
        producers and contract manufacturers in obtaining customers who wish to
        manufacture a product through reliable factories and producers with
        quantities that are affordable for the customer.
      </p>
      <div className="flex items-center gap-4">
        <TiktokSocialIconSVG className="w-6 h-6 cursor-pointer" />
        <FacebookSocialIconSVG
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            window.open("https://www.facebook.com/GarapInSemuaBisa/", "_blank");
          }}
        />
        <InstagramSocialIconSVG
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            window.open("https://www.instagram.com/garap_in/?hl=en", "_blank");
          }}
        />
        <YoutubeSocialIconSVG
          className="w-8 h-8 cursor-pointer"
          onClick={() => {
            window.open(
              "https://www.youtube.com/channel/UCrKjYi-_c7HEJvppHKYfsTw",
              "_blank"
            );
          }}
        />
      </div>
      <Grid container>
        <Grid item xs={6} className="space-y-4">
          <h2 className="font-normal text-lg">{t("footer.our_menu.header")}</h2>
          <ul className="list-none font-light space-y-4 text-sm">
            <li className="cursor-pointer">{t("footer.our_menu.home")}</li>
            <li className="cursor-pointer">{t("footer.our_menu.product")}</li>
            <li className="cursor-pointer">{t("footer.our_menu.about_us")}</li>
            <li className="cursor-pointer">
              {t("footer.our_menu.our_contact")}
            </li>
          </ul>
        </Grid>
        <Grid item xs={6} className="space-y-4">
          <h2 className="font-normal text-lg">
            {t("footer.get_in_touch.header")}
          </h2>
          <ul className="list-none font-light space-y-4 text-sm">
            <li className="cursor-pointer">0821-3758-5330 (Mitra)</li>
            <li className="cursor-pointer">0813-8020-6100 (Customer)</li>
            <li className="cursor-pointer">contact@garap.in</li>
          </ul>
        </Grid>
      </Grid>
      <Divider className="border-white" />
      <div className="text-center font-bold">
        Copyright © {new Date().getFullYear()} garap.in All Rights Reserved
      </div>
    </Box>
  );
};

export default withTranslation("common")(GarapinFooter);
