import { Button } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto p-4 space-y-4 text-center">
      <img src="/assets/404.png" alt="404" className="aspect-auto w-full" />
      <h2 className="text-2xl font-semibold">
        Maaf, Halaman Yang Anda Cari Tidak Ditemukan
      </h2>
      <p className="text-slate-600 leading-7">
        Terjadi kesalahan 404, yang berarti bahwa halaman yang Anda tuju tidak
        dapat ditemukan di server kami. Mohon cek kembali URL atau cobalah untuk
        mengakses halaman tersebut kembali nanti.
      </p>
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
  );
};

export default Custom404;
