import { Button } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Custom404 = () => {
  const router = useRouter();
  return (
    <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto p-4 space-y-4 text-center md:py-10">
      <img src="/assets/404.png" alt="404" className="aspect-auto w-full" />
      <h2 className="text-2xl font-semibold">
        Maaf, Halaman Yang Anda Cari Tidak Ditemukan
      </h2>
      <p className="text-slate-600 leading-7">
        Terjadi kesalahan 404, yang berarti bahwa halaman yang Anda tuju tidak
        dapat ditemukan di server kami. Mohon cek kembali URL atau cobalah untuk
        mengakses halaman tersebut kembali nanti.
      </p>
      <div className="max-w-md mx-auto">
        <Button
          variant="contained"
          className="text-lg font-semibold capitalize py-3"
          fullWidth
          endIcon={<ArrowForwardIcon />}
          onClick={() => router.push("/")}
        >
          Kembali ke Home
        </Button>
      </div>
    </div>
  );
};

export default Custom404;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["products", "common"])),
    },
  };
};
