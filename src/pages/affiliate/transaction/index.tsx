import { LinkIconSVG } from "@/assets/icons/link-icon";
import { SearchIconSVG } from "@/assets/icons/search-icon";
import { WithdrawIconSVG } from "@/assets/icons/withdraw-icon";
import GASSAppBar from "@/components/GASSAppBar";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { Box, Button, IconButton, Pagination, TextField } from "@mui/material";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AffiliateTransaction = () => {
  const router = useRouter();
  return (
    <div className="bg-slate-50">
      <GASSAppBar />
      <div className="max-w-screen-2xl mx-auto py-8 space-y-8">
        <div className="flex items-center justify-between gap-4 bg-white rounded-md p-8 relative">
          <div>
            <p className="text-slate-500 mb-2">Saldo Affiliate</p>
            <h2 className="font-medium text-[32px]">Rp.500.000</h2>
          </div>
          <div
            className="flex items-center gap-2 bg-[#713F97] px-28 py-4 rounded-md text-white mr-[100px] hover:bg-[#713F97]/80 cursor-pointer"
            onClick={() => router.push("/affiliate/withdraw")}
          >
            <WithdrawIconSVG />
            <p>Tarik Saldo</p>
          </div>
          <img
            src="/assets/affiliate/withdraw-bg-illustration.svg"
            className="absolute top-0 right-0"
          />
        </div>
        <div>
          <h2 className="font-medium text-[32px] mb-2">Riwayat Transaksi</h2>
          <p className="text-slate-500">Rutin pantau performa penghasilanmu</p>
        </div>
        <div className="p-4 bg-white rounded-md space-y-4">
          <div className="space-y-2">
            <h2 className="font-medium text-2xl">
              List Produk Yang Pernah Anda Promosikan
            </h2>
          </div>
          <Box className="shadow-sm border-t border-slate-700 max-w-screen-2xl mx-auto flex items-stretch gap-2 bg-white mb-4">
            <TextField
              placeholder="Cari Produk Packaging"
              fullWidth
              InputProps={{
                startAdornment: (
                  <IconButton type="submit">
                    <SearchIconSVG className="w-6 h-6 text-black" />
                  </IconButton>
                ),
              }}
            ></TextField>

            <Button variant="contained" className="rounded-md capitalize">
              Cek
            </Button>
          </Box>
          <table className="table-auto w-full pt-4">
            <thead>
              <tr>
                <th className="font-medium p-4 w-[10%]">IMAGE</th>
                <th className="font-medium p-4 w-[20%]">
                  TANGGAL MULAI PROMOSI
                </th>
                <th className="font-medium p-4 w-[15%]">KATEGORI</th>
                <th className="font-medium p-4 w-[25%]">NAMA PRODUK</th>
                <th className="font-medium p-4 w-[10%]">Jumlah Klik</th>
                <th className="font-medium p-4 w-[10%]">Jumlah Dijual</th>
                <th className="font-medium p-4 w-[10%]">KOMISI</th>
                <th className="font-medium p-4 w-[10%]">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {[1, 2, 3, 4, 5].map((data, i) => (
                <tr className="odd:bg-slate-50">
                  <td className="p-4">
                    <img src={imagePlaceholder} alt="" className="w-full" />
                  </td>
                  <td className="p-4 text-slate-500">12 Juni 2023</td>
                  <td className="p-4 text-slate-500">Ready To Buy</td>
                  <td className="p-4 text-blue-600">
                    <Link
                      href="/affiliate/transaction/kemasan-a"
                      className="cursor-pointer"
                    >
                      Kemasan A
                    </Link>
                  </td>
                  <td className="p-4 text-slate-500">80 kali</td>
                  <td className="p-4 text-slate-500">10pcs</td>
                  <td className="p-4 text-green-500">20%</td>
                  <td className="p-4">
                    <Button
                      variant="contained"
                      className="rounded-md capitalize py-3 max-w-[20px]"
                    >
                      <LinkIconSVG />
                    </Button>
                  </td>
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

AffiliateTransaction.showAppBar = false;
AffiliateTransaction.showFooter = false;

export default AffiliateTransaction;

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
