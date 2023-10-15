import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Slider,
  TextField,
} from "@mui/material";
import LoginPage from "@/pages/login";
import CardVertical from "@/components/CardVertical";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { getAllProductList, getSearchProduct } from "@/store/modules/products";
import { getProductPrice, rupiah } from "@/tools/rupiah";
import { useRef } from "react";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { getCategoryLabel } from "@/tools/utils";
import { Star } from "@mui/icons-material";
import { SearchIconSVG } from "@/assets/icons/search-icon";
import ImageSlider from "@/components/ImageSlider";
import Consultation from "@/components/Consultation";
import GarapinFAQ from "@/components/GarapinFAQ";
import NoResult from "@/components/NoResult";

const ProductListPage = () => {
  const router = useRouter();
  const [valueRange, setValueRange] = React.useState<number[]>([0, 100000000]);
  const [filter, setFilter] = React.useState<any>({
    query: "",
    category: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const { t } = useTranslation("products");

  const {
    products,
    isProductLoading,
    allProductsLoaded,
    isFetchingNext,
    searchHit,
  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { category } = router.query;
  const searchRef = useRef<HTMLFormElement | any>(null);

  React.useEffect(() => {
    if (category) {
      setFilter({
        query: "",
        category: [category],
        minPrice: 0,
        maxPrice: 0,
      });
    }
    dispatch(
      getSearchProduct({
        query: "",
        category: category ? [category as string] : [],
        minPrice: 0,
        maxPrice: 0,
        valueRange: [0, 100000000],
      })
    );
  }, [category]);

  const handleSubmitFilter = (e: any) => {
    e.preventDefault();
    dispatch(
      getSearchProduct({
        ...filter,
        ...{
          minPrice: valueRange[0],
          maxPrice: valueRange[1],
        },
      })
    );
  };

  const handleReset = () => {
    setFilter({
      query: "",
      category: [],
      minPrice: 0,
      maxPrice: 0,
    });
    searchRef.current.value = "";
    setValueRange([0, 100000000]);
    dispatch(
      getSearchProduct({
        query: "",
        category: [],
        minPrice: 0,
        maxPrice: 0,
        valueRange: [0, 100000000],
      })
    );
  };

  const getSearchTerm = () => {
    if (filter.query) {
      return filter.query;
    } else if (filter.category.length > 0) {
      const categories = filter.category.map((item: any) =>
        getCategoryLabel(item)
      );
      return categories.join(", ");
    } else {
      return "Semua Produk";
    }
  };

  return (
    <Box className="bg-slate-50">
      <form onSubmit={handleSubmitFilter}>
        <Box className="p-4 lg:hidden shadow-sm border-t border-slate-700 max-w-screen-2xl mx-auto flex items-stretch gap-2 bg-white mb-4">
          <TextField
            placeholder="Cari produk anda..."
            fullWidth
            inputRef={searchRef}
            InputProps={{
              startAdornment: (
                <IconButton type="submit">
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
                <Button
                  className="capitalize"
                  type="button"
                  onClick={handleReset}
                >
                  Reset Filter
                </Button>
              </div>
              <div className="filters space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Pencarian</p>
                  <TextField
                    placeholder="Cari produk anda..."
                    fullWidth
                    inputRef={searchRef}
                    onChange={(event) => {
                      setFilter({ ...filter, query: event.target.value });
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSubmitFilter(event);
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Kategori</p>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Ready To Buy"
                        value="01"
                        checked={filter.category.includes("01")}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            setFilter({
                              ...filter,
                              category: [...filter.category, e.target.value],
                            });
                          } else {
                            setFilter({
                              ...filter,
                              category: filter.category.filter(
                                (item: any) => item !== e.target.value
                              ),
                            });
                          }
                        }}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Digital Packaging"
                        value="02"
                        checked={filter.category.includes("02")}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            setFilter({
                              ...filter,
                              category: [...filter.category, e.target.value],
                            });
                          } else {
                            setFilter({
                              ...filter,
                              category: filter.category.filter(
                                (item: any) => item !== e.target.value
                              ),
                            });
                          }
                        }}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Custom Packaging"
                        value="03"
                        checked={filter.category.includes("03")}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            setFilter({
                              ...filter,
                              category: [...filter.category, e.target.value],
                            });
                          } else {
                            setFilter({
                              ...filter,
                              category: filter.category.filter(
                                (item: any) => item !== e.target.value
                              ),
                            });
                          }
                        }}
                      />
                    </FormGroup>
                  </FormControl>
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
                    step={1}
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
                <Button
                  className="capitalize py-3"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Apply Filter
                </Button>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9 w-full">
              <Box className="flex flex-col py-4 md:py-0">
                <Container>
                  {isProductLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <CircularProgress />
                    </div>
                  ) : (
                    <Box>
                      {searchHit === 0 ? (
                        <div className="py-6 flex items-center justify-center">
                          <NoResult />
                        </div>
                      ) : (
                        <Box className="flex flex-col py-4">
                          <Typography
                            className="px-0 text-[22px] font-semibold mb-4"
                            variant="h6"
                            color="text.primary"
                          >
                            {t("show")}
                            <span className="text-[#713F97] px-1">
                              {searchHit}
                            </span>
                            {t("results", {
                              searchTerm: getSearchTerm(),
                            })}
                          </Typography>
                          <Grid
                            className="px-0 md:pt-0"
                            container
                            spacing={3}
                            alignItems="stretch"
                          >
                            {products.map((product: any) => (
                              <Grid
                                key={product.id}
                                item
                                xs={6}
                                md={4}
                                lg={3}
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
                          </Grid>
                        </Box>
                      )}
                    </Box>
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
                </Container>
              </Box>
            </div>
          </div>
          <Consultation className="mt-10" />
          <GarapinFAQ className="my-16" />
        </Container>
      </form>
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
