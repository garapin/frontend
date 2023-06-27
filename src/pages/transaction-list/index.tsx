import React from "react";
import CardVertical from "@/components/CardVertical";
import { getFirestore } from "@/configs/firebase";
import { useAppSelector } from "@/hooks/useAppRedux";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { getAllProductNext, getAllProducts } from "@/store/modules/products";
import { Product } from "@/types/product";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
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

const TransactionListIndex = () => {
  const auth = useFirebaseAuth();
  const { categories } = useAppSelector((state) => state.appDefaults);
  const { products, isProductLoading, allProductsLoaded, isFetchingNext } =
    useAppSelector((state) => state.product);
  const dispatch = useDispatch();
  const [isTab, setTab] = React.useState("cp");

  const firestore = getFirestore();

  useEffect(() => {
    dispatch<any>(getAllProducts());
  }, []);

  const handleChangeTabs = (val: any) => {
    setTab(val);
  };

  return (
    <div className="py-40 flex-grow flex-fill">
      <Container>
        <Typography variant="h5" fontWeight={600} marginBottom="10px">
          Order List
        </Typography>
        <Box className="mb-8 flex items-center">
          <Typography marginRight="30px">Product Category</Typography>
          <div
            onClick={() => handleChangeTabs("cp")}
            className={`p-3 mr-5 rounded-md cursor-pointer text-white ${
              isTab === "cp" ? "bg-[#713F97]" : "bg-[#bb86fc]"
            }`}
          >
            Custom Packaging{" "}
            <span className="bg-[#cfd6c8] rounded-full p-1">5</span>
          </div>
          <div
            onClick={() => handleChangeTabs("dp")}
            className={`p-3 mr-5 rounded-md cursor-pointer text-white ${
              isTab === "dp" ? "bg-[#713F97]" : "bg-[#bb86fc]"
            }`}
          >
            Digital Packaging{" "}
            <span className="bg-[#cfd6c8] rounded-full p-1">2</span>
          </div>
          <div
            onClick={() => handleChangeTabs("rtb")}
            className={`p-3 mr-5 rounded-md cursor-pointer text-white ${
              isTab === "rtb" ? "bg-[#713F97]" : "bg-[#bb86fc]"
            }`}
          >
            Ready To Buy{" "}
            <span className="bg-[#cfd6c8] rounded-full p-1">7</span>
          </div>
        </Box>
        <Box>
          <TransactionList currentTab={isTab} />
        </Box>

        {auth?.authUser?.authTokenData?.claims?.["printing"]?.["customer"] && (
          <Typography>Showing Customer DB</Typography>
        )}
        {auth?.authUser?.authTokenData?.claims?.["printing"]?.["partner"] && (
          <Typography>Showing Partner DB</Typography>
        )}

        <Typography variant="h5" style={{ paddingTop: "40px" }}>
          Categories:
        </Typography>
        <Divider />
        {categories.map((category: any) => (
          <p key={category.id}>
            {category.id} {category.name} {category.slug} channel:{" "}
            {category.channel}
          </p>
        ))}

        <Typography variant="h5" style={{ paddingTop: "40px" }}>
          Products {isProductLoading && <CircularProgress size={10} />}
        </Typography>
        <Divider />

        <Grid
          container
          spacing={{
            xs: 2,
            sm: 4,
          }}
          paddingTop={4}
        >
          {!isProductLoading &&
            products.map((product: any) => (
              <Grid item sm={4} md={3} key={product.id}>
                <Link
                  href={`/product-detail/${encodeURIComponent(product.slug)}`}
                >
                  <CardVertical
                    key={product.id}
                    slug={product.id ?? ""}
                    productName={product.productName}
                    price={`Rp${product.minPrice} - Rp${product.maxPrice}`}
                    location="Jakarta"
                    imageUrl={product.img[0]}
                  />
                </Link>
              </Grid>
            ))}
        </Grid>
        {!allProductsLoaded && (
          <Grid
            item
            xs={12}
            alignItems="center"
            display={"flex"}
            justifyContent={"center"}
            paddingTop={4}
          >
            <Button
              variant="contained"
              disabled={isFetchingNext}
              onClick={() => dispatch<any>(getAllProductNext())}
            >
              Load more... {isFetchingNext && <CircularProgress size={10} />}
            </Button>
          </Grid>
        )}
      </Container>
    </div>
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
