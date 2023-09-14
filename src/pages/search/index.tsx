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
  getNextSearchProduct,
  getSearchProduct,
} from "@/store/modules/products";
import { getProductPrice, rupiah } from "@/tools/rupiah";
import { useRef } from "react";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { getCategoryLabel } from "@/tools/utils";
import { SearchIconSVG } from "@/assets/icons/search-icon";
import { FilterIconSVG } from "@/assets/icons/filter-icon";
import ImageSlider from "@/components/ImageSlider";
import NoResult from "@/components/NoResult";
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
      <Box className="p-4 shadow-sm border-t border-slate-700 max-w-md mx-auto flex items-stretch gap-2 bg-white mb-4">
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
      <Container className="max-w-md mx-auto bg-slate-50 px-4">
        <ImageSlider />
        {isProductLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            {searchHit === 0 ? (
              <div className="py-6">
                <NoResult />
              </div>
            ) : (
              <Box className="flex flex-col py-4">
                {q !== undefined && (
                  <Typography
                    className="px-0 text-[22px] font-semibold"
                    variant="h6"
                    color="text.primary"
                  >
                    {t("show")}
                    <span className="text-[#713F97] px-1">
                      {products.length}
                    </span>
                    {t("results", {
                      searchTerm: q ?? "",
                    })}
                  </Typography>
                )}
                <Grid
                  className="px-0 pt-4 md:pt-8"
                  container
                  spacing={3}
                  alignItems="stretch"
                >
                  {products.map((product: any) => (
                    <Grid
                      key={product.id}
                      item
                      xs={6}
                      className="content-center"
                    >
                      <CardVertical
                        key={product.id}
                        imageUrl={product.img[0] ?? imagePlaceholder}
                        productName={product.productName}
                        price={getProductPrice(product)}
                        slug={product.slug?.toString() ?? product.sku}
                        category={getCategoryLabel(product.category)}
                        isWhiteBg
                      />
                    </Grid>
                  ))}
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
            )}
          </Box>
        )}
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
