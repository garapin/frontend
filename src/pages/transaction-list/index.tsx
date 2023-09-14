import React, { useRef } from "react";
import CardVertical from "@/components/CardVertical";
import { getFirestore } from "@/configs/firebase";
import { useAppSelector } from "@/hooks/useAppRedux";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import {
  getAllProductList,
  getAllProductNext,
  getAllProducts,
} from "@/store/modules/products";
import { Product } from "@/types/product";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionList from "@/components/TransactionList";

import { faker } from "@faker-js/faker";
import Link from "next/link";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { getProductPrice } from "@/tools/rupiah";
import { SearchIconSVG } from "@/assets/icons/search-icon";

const TransactionListIndex = () => {
  const auth = useFirebaseAuth();
  const { categories } = useAppSelector((state) => state.appDefaults);
  const {
    products,
    isProductLoading,
    allProductsLoaded,
    isFetchingNext,
    history,
  } = useAppSelector((state) => state.product);
  const dispatch = useDispatch();
  const [isTab, setTab] = React.useState("cp");
  const searchRef = useRef<HTMLFormElement | any>(null);

  useEffect(() => {
    dispatch<any>(getAllProducts());
  }, []);

  const handleChangeTabs = (val: any) => {
    setTab(val);
  };

  return (
    <main className="max-w-md mx-auto bg-slate-50 p-4">
      <Box className="h-min-screen flex flex-col justify-center bg-white rounded-xl py-8">
        <Container maxWidth="xl" className="px-4 space-y-4">
          <Typography
            fontSize={32}
            color="text.primary"
            className="font-semibold"
          >
            Daftar Transaksi
          </Typography>
          <TextField
            placeholder="Cari Produk Anda"
            fullWidth
            inputRef={searchRef}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                // fetch
              }
            }}
            InputProps={{
              startAdornment: (
                <IconButton
                  onClick={(event) => {
                    // fetch
                  }}
                >
                  <SearchIconSVG className="w-6 h-6 text-black" />
                </IconButton>
              ),

              style: {
                padding: "0px 4px",
              },
            }}
          />

          <Box>
            <div className="flex items-center justify-between">
              <Typography variant="body1" className="text-base font-semibold">
                Status
              </Typography>
              <Button
                variant="text"
                className="capitalize"
                onClick={() => {
                  searchRef.current.value = "";
                  handleChangeTabs("cp");
                }}
              >
                Reset Filter
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <div
                onClick={() => handleChangeTabs("cp")}
                className={`px-3 py-2 rounded-md cursor-pointer ${
                  isTab === "cp"
                    ? "bg-[#713F97]/10 text-[#713F97]"
                    : "bg-white text-slate-600"
                }`}
                style={{
                  border:
                    isTab === "cp" ? "1px solid #713F97" : "1px solid #696F79",
                }}
              >
                <Typography variant="body2">Custom Packaging</Typography>
              </div>
              <div
                onClick={() => handleChangeTabs("dp")}
                className={`px-3 py-2 rounded-md cursor-pointer ${
                  isTab === "dp"
                    ? "bg-[#713F97]/10 text-[#713F97]"
                    : "bg-white text-black"
                }`}
                style={{
                  border:
                    isTab === "dp" ? "1px solid #713F97" : "1px solid #696F79",
                }}
              >
                <Typography variant="body2">
                  Ready To Buy & Digital Packaging
                </Typography>
              </div>
            </div>

            <TransactionList currentTab={isTab} />
          </Box>
        </Container>
      </Box>
    </main>
  );
};

TransactionListIndex.guestGuard = false;
TransactionListIndex.authGuard = true;

export default TransactionListIndex;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
};
