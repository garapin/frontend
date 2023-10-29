import Box from "@mui/material/Box";
import * as React from "react";
import { withTranslation, WithTranslation } from "next-i18next";
import { Divider, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { TiktokSocialIconSVG } from "@/assets/icons/tiktok-social-icon";
import { FacebookSocialIconSVG } from "@/assets/icons/facebook-social-icon";
import { InstagramSocialIconSVG } from "@/assets/icons/instagram-social-icon";
import { YoutubeSocialIconSVG } from "@/assets/icons/youtube-social-icon";
import { MailOutline, WhatsApp } from "@mui/icons-material";

interface Props extends WithTranslation {}
const GarapinFooter: React.FC<Props> = ({ t }) => {
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
      className="bg-[#713F97] pt-10 pb-5 space-y-6 px-4 lg:pt-16 font-sans text-slate-100"
      id="footer"
    >
      <div className="max-w-screen-2xl mx-auto">
        <Grid container>
          <Grid item lg={5} xs={12} className="space-y-4">
            <div className="flex items-center lg:items-start justify-center lg:justify-start">
              <Image
                src="/garapin_logo_white.svg"
                alt="Garapin Logo"
                width={100}
                height={100}
                className="w-[350px] h-[100px] lg:w-[280px] lg:h-[75px]"
              />
            </div>
            <div className="md:pl-20 space-y-4">
              <p className="font-light leading-7 max-w-[400px]">
                {t("footer.excerpt.content")}.
              </p>
              <div>
                <p className="font-semibold text-lg">
                  PT. Visi Teknologi Digital
                </p>
                <p className="max-w-[300px] font-light leading-7">
                  Gd Grand Slipi Tower 5th Fl Unit F Jl Letjen S Parman Kav
                  22-24. Palmerah - Jakarta Barat 11480. Indonesia.
                </p>
              </div>
              <div>
                <p className="text-lg">{t("footer.pse.header")}</p>
                <div className="flex items-center gap-2">
                  <img
                    src="/kominfo.png"
                    alt="kominfo"
                    className="h-[20px] w-[20px]"
                  />

                  <p className="max-w-[300px] font-light leading-7">
                    000205.01/DJAI.PSE/02/2021
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <TiktokSocialIconSVG className="w-6 h-6 cursor-pointer" />
                <FacebookSocialIconSVG
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/GarapInSemuaBisa/",
                      "_blank"
                    );
                  }}
                />
                <InstagramSocialIconSVG
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/garap_in/?hl=en",
                      "_blank"
                    );
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
            </div>
          </Grid>
          <Grid item lg={3} xs={12} className="space-y-4 pt-8 lg:pt-2">
            <h2 className="font-normal text-lg md:text-3xl">
              {t("footer.our_menu.header")}
            </h2>
            <ul className="list-none font-light space-y-4 text-sm">
              <li className="cursor-pointer">{t("footer.our_menu.home")}</li>
              <li
                className="cursor-pointer"
                onClick={() => {
                  router.push("/product-list");
                }}
              >
                {t("footer.our_menu.product")}
              </li>
              <li className="cursor-pointer">
                {t("footer.our_menu.about_us")}
              </li>
              <li className="cursor-pointer">
                {t("footer.our_menu.our_contact")}
              </li>
            </ul>
          </Grid>
          <Grid item lg={4} xs={12} className="space-y-4 pt-8 lg:pt-2">
            <h2 className="font-normal text-lg md:text-3xl">
              {t("footer.get_in_touch.header")}
            </h2>
            <ul className="list-none font-light space-y-4 text-sm">
              <li className="cursor-pointer flex items-center gap-2">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-purple-900">
                  <WhatsApp />
                </div>
                <p>0821-3758-5330 (Mitra)</p>
              </li>
              <li className="cursor-pointer flex items-center gap-2">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-purple-900">
                  <WhatsApp />
                </div>
                <p>0813-8020-6100 (Customer)</p>
              </li>
              <li className="cursor-pointer flex items-center gap-2">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-purple-900">
                  <MailOutline />
                </div>
                <p>contact@garap.in</p>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>
      <Divider className="border-white" />
      <div className="text-center font-bold">
        Copyright © {new Date().getFullYear()} garap.in All Rights Reserved
      </div>
    </Box>
  );
};

export default withTranslation("common")(GarapinFooter);
