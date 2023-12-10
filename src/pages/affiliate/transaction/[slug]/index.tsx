import { LinkIconSVG } from "@/assets/icons/link-icon";
import { SearchIconSVG } from "@/assets/icons/search-icon";
import { WithdrawIconSVG } from "@/assets/icons/withdraw-icon";
import GASSAppBar from "@/components/GASSAppBar";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { rupiah } from "@/tools/rupiah";
import { getCategoryLabel } from "@/tools/utils";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AffiliateTransactionDetail = () => {
  const router = useRouter();
  return (
    <div className="bg-slate-50">
      <GASSAppBar />
      <div className="max-w-screen-2xl mx-auto py-8 space-y-8">
        <div>
          <h2 className="font-medium text-[32px] mb-2">Transaksi Detail</h2>
          <p className="text-slate-500">
            Disini kalian bisa lihat performa produk secara lebih detail lagi.
          </p>
        </div>
        <div className="p-4 bg-white rounded-md space-y-4">
          <div className="space-y-2">
            <h2 className="font-medium text-2xl">Produk</h2>
            <p>
              Total Keuntungan Affiliate Produk ini :{" "}
              <span className="text-green-500">Rp.5.000.000</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-md">
            <img
              style={{ borderRadius: "20%" }}
              className="rounded-lg object-cover w-full aspect-video md:w-44 md:h-44"
              src={imagePlaceholder}
              alt="image"
            />
            <div className="space-y-2">
              <Typography
                className="max-w-[12rem] text-[#713F97] pt-2 font-semibold"
                fontSize={14}
                fontWeight={400}
              >
                {getCategoryLabel("1")}
              </Typography>
              <Typography
                fontSize={17}
                fontWeight={400}
                color="text.primary"
                className="font-semibold"
              >
                Kardus Cokelat By Garapin
              </Typography>
              <Typography className="text-sm text-slate-600">
                {rupiah(40000)}
              </Typography>
            </div>
          </div>

          <table className="table-auto w-full pt-4">
            <thead>
              <tr>
                <th className="font-medium p-4 w-[10%]">IMAGE</th>
                <th className="font-medium p-4 w-[20%]">TANGGAL PENJUALAN</th>
                {/* <th className="font-medium p-4 w-[15%]">KATEGORI</th>
                <th className="font-medium p-4 w-[25%]">NAMA PRODUK</th> */}
                <th className="font-medium p-4 w-[10%]">HARGA/PCS</th>
                <th className="font-medium p-4 w-[10%]">QTY</th>
                <th className="font-medium p-4 w-[10%]">PENJUALAN</th>
                <th className="font-medium p-4 w-[10%]">STATUS</th>
                <th className="font-medium p-4 w-[10%]">KOMISI</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {[1, 2, 3, 4, 5].map((data, i) => (
                <tr className="odd:bg-slate-50">
                  <td className="p-4">
                    <img src={imagePlaceholder} alt="" className="w-full" />
                  </td>
                  <td className="p-4 text-slate-500">12 Juni 2023</td>
                  <td className="p-4 text-slate-500">Rp.20000</td>
                  <td className="p-4 text-slate-500">2</td>
                  <td className="p-4 text-slate-500">{rupiah(20000000)}</td>
                  <td className="p-4 text-slate-500">
                    <div className="bg-amber-200 p-2 rounded-md text-amber-500 text-sm">
                      Sedang Diproduksi
                    </div>
                  </td>
                  <td className="p-4 text-green-500">{rupiah(200000)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between">
            <p className="text-slate-500">Show 5 produk of 100 Produk</p>
            <Pagination count={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

AffiliateTransactionDetail.showAppBar = false;
AffiliateTransactionDetail.showFooter = false;

export default AffiliateTransactionDetail;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
