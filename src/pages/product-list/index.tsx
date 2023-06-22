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
import { getAllProductNext, getAllProducts } from "@/store/modules/products";
import { rupiah } from "@/tools/rupiah";
import { useRef } from "react";

const ProductListPage = () => {
  const router = useRouter();

  const { t } = useTranslation("products");

  const { products, isProductLoading, allProductsLoaded, isFetchingNext } =
    useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { search } = router.query;
  const searchRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  React.useEffect(() => {
    if (searchRef.current !== null) {
      searchRef.current.value = search;
    }
  }, [search]);

  return (
    <Box>
      <GarapinAppBar searchVariant={true} />
      <Box className="max-w-xl px-10 pt-20 block md:hidden">
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
          {search !== undefined && (
            <Typography
              className="px-10 md:px-0"
              variant="h6"
              color="text.primary"
            >
              {t("searchResult", {
                result: products.filter((productSingle: any) =>
                  search !== undefined
                    ? productSingle.productName
                        .toLowerCase()
                        .includes((search as string).toLowerCase())
                    : true
                ).length,
                searchTerm: search ?? "",
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
              products
                .filter((productSingle: any) =>
                  search !== undefined
                    ? productSingle.productName
                        .toLowerCase()
                        .includes((search as string).toLowerCase())
                    : true
                )
                .map((product: any) => (
                  <Grid
                    key={product.id}
                    item
                    xs={6}
                    md={3}
                    className="content-center"
                  >
                    <CardVertical
                      key={product.id}
                      imageUrl={product.img[0]}
                      productName={product.productName}
                      price={`${rupiah(product.minPrice)} - ${rupiah(
                        product.maxPrice
                      )}`}
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
                  onClick={() => dispatch(getAllProductNext())}
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
