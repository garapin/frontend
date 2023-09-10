import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
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
  getAllProductsBasedOnCategories,
} from "@/store/modules/products";
import { getProductPrice, rupiah } from "@/tools/rupiah";
import { useRef } from "react";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { getCategoryLabel } from "@/tools/utils";
import { SearchIconSVG } from "@/assets/icons/search-icon";

const ProductCategoryPage = () => {
  const router = useRouter();

  const { t } = useTranslation("products");

  const { products, isProductLoading, allProductsLoaded, isFetchingNext } =
    useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { slug } = router.query;
  // const {categories} = useAppSelector(state => state.appDefaults);
  const searchRef = useRef<HTMLFormElement>(null);
  const category = () => {
    switch (slug) {
      case "ready-to-buy":
        return "01";
      case "digital-packaging":
        return "02";
      default:
        return "03";
    }
  };

  React.useEffect(() => {
    dispatch(getAllProductsBasedOnCategories(category()));
  }, []);

  return (
    <Box>
      <Box className="p-4 shadow-sm border-t border-slate-700 max-w-md mx-auto flex items-stretch gap-2">
        <TextField
          placeholder="Cari produk anda..."
          fullWidth
          inputRef={searchRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              router.push(
                `/search${
                  searchRef?.current?.value !== undefined
                    ? `?q=${searchRef?.current?.value}`
                    : ""
                }`
              );
            }
          }}
          InputProps={{
            startAdornment: (
              <IconButton
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
                <SearchIconSVG className="w-6 h-6 text-black" />
              </IconButton>
            ),
          }}
        ></TextField>

        {/* <Button variant="contained" className="rounded-md">
          <FilterIconSVG className="w-6 h-6 text-white" />
        </Button> */}
      </Box>
      <Container className="max-w-md mx-auto">
        <Box className="flex flex-col py-4">
          {slug !== undefined && (
            <Typography
              className="px-10 md:px-0"
              variant="h6"
              color="text.primary"
            >
              {t("searchResult", {
                result: products.length,
                searchTerm: slug ?? "",
              })}
            </Typography>
          )}
          <Grid
            className="px-10 md:px-0 pt-4 md:pt-8"
            container
            spacing={3}
            alignItems="stretch"
          >
            {isProductLoading ? (
              <CircularProgress />
            ) : (
              products.map((product: any) => (
                <Grid key={product.id} item xs={6} className="content-center">
                  <CardVertical
                    key={product.id}
                    imageUrl={product.img[0] ?? imagePlaceholder}
                    productName={product.productName}
                    price={getProductPrice(product)}
                    slug={product.slug?.toString() ?? product.sku}
                    category={getCategoryLabel(product.category)}
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
                  onClick={() => dispatch(getAllProductNext(category()))}
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

export default ProductCategoryPage;

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
