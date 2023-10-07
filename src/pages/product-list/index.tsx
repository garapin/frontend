import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Slider,
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
import { getAllProductList, getAllProducts } from "@/store/modules/products";
import { getProductPrice, rupiah } from "@/tools/rupiah";
import { useRef } from "react";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { getCategoryLabel } from "@/tools/utils";
import { Search, Star } from "@mui/icons-material";
import { SearchPackageIconSVG } from "@/assets/icons/search-package-icon";
import { SearchIconSVG } from "@/assets/icons/search-icon";
import { FilterIconSVG } from "@/assets/icons/filter-icon";
import ImageSlider from "@/components/ImageSlider";
import Consultation from "@/components/Consultation";
import GarapinFAQ from "@/components/GarapinFAQ";

const ProductListPage = () => {
  const router = useRouter();
  const [valueRange, setValueRange] = React.useState<number[]>([0, 100000000]);

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
      searchRef.current.value = search ?? "";
    }
  }, [search]);

  return (
    <Box className="bg-slate-50">
      <Box className="p-4 lg:hidden shadow-sm border-t border-slate-700 max-w-screen-2xl mx-auto flex items-stretch gap-2 bg-white mb-4">
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
      <Container className="max-w-screen-2xl lg:py-6 mx-auto px-4">
        <ImageSlider />
        <div className="grid grid-cols-12 gap-6 w-full">
          <div className="hidden lg:block col-span-3 bg-white h-screen p-6 rounded-2xl mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold">Filter</h2>
              <Button className="capitalize">Reset Filter</Button>
            </div>
            <div className="filters space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Pencarian</p>
                <TextField
                  placeholder="Cari produk anda..."
                  fullWidth
                  inputRef={searchRef}
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium">Kategori</p>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Ready To Buy"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Digital Packaging"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Custom Packaging"
                  />
                </FormGroup>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Range Harga</p>
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={valueRange}
                  onChange={(e: any, value: any) => {
                    setValueRange(value as number[]);
                  }}
                  max={100000000}
                  valueLabelDisplay="auto"
                  getAriaValueText={(value: number) => `${rupiah(value)}`}
                  className="h-[8px]"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {rupiah(valueRange[0])}
                  </p>
                  <p className="text-sm text-gray-500">
                    {rupiah(valueRange[1])}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Bahan</p>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Plastik" />
                  <FormControlLabel control={<Checkbox />} label="Kertas" />
                  <FormControlLabel control={<Checkbox />} label="Karton" />
                </FormGroup>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Bahan</p>
                {[5, 4, 3, 2, 1].map((item) => (
                  <FormGroup key={item}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <div className="flex items-center gap-1">
                          <span>{item}</span>
                          {Array.from(Array(item).keys()).map((item) => (
                            <Star className="text-yellow-400" key={item} />
                          ))}
                        </div>
                      }
                    />
                  </FormGroup>
                ))}
              </div>
              <Button className="capitalize py-3" variant="contained" fullWidth>
                Apply Filter
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9 w-full">
            <Box className="flex flex-col py-4">
              {search !== undefined && (
                <Typography className="px-0" variant="h6" color="text.primary">
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
              <Grid container spacing={3} alignItems="stretch">
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
                        md={4}
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
                      onClick={() => dispatch(getAllProductList())}
                    >
                      Load more...{" "}
                      {isFetchingNext && <CircularProgress size={10} />}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </div>
        </div>
        <Consultation className="mt-10" />
        <GarapinFAQ className="my-16" />
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
      ...(await serverSideTranslations(locale, [
        "products",
        "common",
        "landing",
      ])),
    },
  };
};
