import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import LoginPage from "@/pages/login";
import GarapinAppBar from "@/components/GarapinAppBar";
import CardVertical from "@/components/CardVertical";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import {
  getAllProductNext,
  getAllProducts,
  getNextSearchProduct,
  getSearchProduct,
} from "@/store/modules/products";
import { getProductPrice, rupiah } from "@/tools/rupiah";
import { useRef } from "react";
import { imagePlaceholder } from "@/components/ProductList/ProductList";

const productData = [
  {
    id: 1,
    name: "Product 1",
    price: 10000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 30000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 10000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 20000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 30000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 7,
    name: "Product 7",
    price: 10000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 8,
    name: "Product 8",
    price: 20000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 9,
    name: "Product 9",
    price: 10000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 10,
    name: "Product 10",
    price: 20000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 11,
    name: "Product 11",
    price: 10000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 12,
    name: "Product 12",
    price: 20000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 13,
    name: "Product 13",
    price: 10000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
  {
    id: 14,
    name: "Product 14",
    price: 20000,
    image:
      "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg",
  },
];

const ProductListPage = () => {
  const router = useRouter();

  const { t } = useTranslation("products");

  const {
    products,
    isProductLoading,
    allProductsLoaded,
    isFetchingNext,
    searchHit,
  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { q } = router.query;
  const searchRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    dispatch(getSearchProduct(q as string));
  }, [q]);

  React.useEffect(() => {
    if (searchRef.current !== null) {
      searchRef.current.value = q;
    }
  }, [q]);

  return (
    <Box>
      <GarapinAppBar searchVariant={true} />
      <Box className="max-w-6xl px-10 pt-20 mx-auto md:hidden">
        <TextField
          placeholder="Saya mau buat..."
          fullWidth
          inputRef={searchRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="garapinColor"
                  onClick={(event) => {
                    router.push(
                      `/search${
                        searchRef?.current?.value !== undefined
                          ? `?q=${searchRef?.current?.value}`
                          : ""
                      }`
                    );
                  }}
                >
                  Cari
                </Button>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Box>
      <Container>
        <Box className="flex flex-col py-4 md:py-20">
          {q !== undefined && (
            <Typography
              className="px-10 md:px-0"
              variant="h6"
              color="text.primary"
            >
              {t("searchResult", {
                result: searchHit,
                searchTerm: q ?? "",
              })}
            </Typography>
          )}
          <Grid
            className="px-10 md:px-0 pt-4 md:pt-8"
            container
            spacing={4}
            alignItems="stretch"
          >
            {isProductLoading ? (
              <CircularProgress />
            ) : (
              products.map((product: any) => (
                <Grid
                  key={product.id}
                  item
                  xs={6}
                  md={3}
                  className="content-center"
                >
                  <CardVertical
                    key={product.id}
                    imageUrl={product.img[0] ?? imagePlaceholder}
                    productName={product.productName}
                    price={getProductPrice(product)}
                    location="Jakarta"
                    slug={product.slug?.toString() ?? product.sku}
                  />
                </Grid>
              ))
            )}
            {!allProductsLoaded && (
              <Grid
                item
                xs={12}
                alignItems="center"
                display={"flex"}
                justifyContent={"center"}
              >
                <Button
                  variant="contained"
                  disabled={isFetchingNext}
                  onClick={() => dispatch(getNextSearchProduct())}
                >
                  Load more...{" "}
                  {isFetchingNext && <CircularProgress size={10} />}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

LoginPage.authGuard = false;
LoginPage.guestGuard = true;

export default ProductListPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["products", "common"])),
    },
  };
};
