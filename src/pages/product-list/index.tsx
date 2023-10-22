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
  Modal,
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
import {
  getAllProductList,
  getNextSearchProduct,
  getSearchProduct,
} from "@/store/modules/products";
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
import { FilterIconSVG } from "@/assets/icons/filter-icon";

const style = {
  position: "absolute" as "absolute",
  top: "0",
  left: "0",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "100%",
};

const ProductListPage = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [valueRange, setValueRange] = React.useState<number[]>([0, 10000000]);
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
  const [searchTerm, setSearchTerm] = React.useState("");

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
        valueRange: [0, 10000000],
      })
    );

    setSearchTerm(
      getSearchTerm({
        ...filter,
        query: "",
        category: category ? [category as string] : [],
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
    setSearchTerm(getSearchTerm(filter));
  };

  const handleReset = async () => {
    await setFilter({
      query: "",
      category: [],
      minPrice: 0,
      maxPrice: 0,
    });
    searchRef.current.value = "";
    setValueRange([0, 10000000]);
    dispatch(
      getSearchProduct({
        query: "",
        category: [],
        minPrice: 0,
        maxPrice: 0,
        valueRange: [0, 10000000],
      })
    );
    setSearchTerm(
      getSearchTerm({
        ...filter,
        query: "",
        category: [],
      })
    );
  };

  function getSearchTerm(filter: any) {
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
  }

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

          <Button
            variant="contained"
            className="rounded-md"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FilterIconSVG className="w-6 h-6 text-white" />
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="space-y-2 px-6 py-2">
            <div className="flex items-center justify-end">
              <IconButton onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </IconButton>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold">Filter</h2>
              <Button
                className="capitalize"
                type="button"
                onClick={handleReset}
              >
                Reset Filter
              </Button>
            </div>

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
            <div className="space-y-0">
              <p className="font-medium">Range Harga</p>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={valueRange}
                onChange={(e: any, value: any) => {
                  setValueRange(value as number[]);
                }}
                max={10000000}
                step={1000}
                valueLabelDisplay="auto"
                getAriaValueText={(value: number) => `${rupiah(value)}`}
                className="h-[8px]"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{rupiah(valueRange[0])}</p>
                <p className="text-sm text-gray-500">{rupiah(valueRange[1])}</p>
              </div>
            </div>
            <div className="pt-10">
              <Button
                className="capitalize py-3"
                variant="contained"
                fullWidth
                type="submit"
                onClick={(event) => {
                  handleSubmitFilter(event);
                  setOpen(false);
                }}
              >
                Apply Filter
              </Button>
            </div>
          </Box>
        </Modal>
        <Container className="max-w-screen-2xl lg:py-6 mx-auto px-4">
          <ImageSlider />
          <div className="grid grid-cols-12 gap-6 w-full">
            <div className="hidden lg:block col-span-3 ">
              <div className="bg-white h-screen p-6 rounded-2xl mt-4 space-y-4">
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
                      max={10000000}
                      step={1000}
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
                  {/* <div className="space-y-2">
                    <p className="font-medium">Bahan</p>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Plastik"
                      />
                      <FormControlLabel control={<Checkbox />} label="Kertas" />
                      <FormControlLabel control={<Checkbox />} label="Karton" />
                    </FormGroup>
                  </div> */}
                  {/* <div className="space-y-2">
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
                  </div> */}
                  <Button
                    className="capitalize py-6"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Apply Filter
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9 w-full">
              <Box className="flex flex-col py-4 md:py-0">
                <Container>
                  {isProductLoading ? (
                    <div className="flex h-[80vh] items-center justify-center py-10">
                      <CircularProgress />
                    </div>
                  ) : (
                    <Box>
                      {searchHit === 0 ? (
                        <div className="h-[80vh] flex items-center justify-center">
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
                              searchTerm: searchTerm,
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
                        onClick={() => dispatch(getNextSearchProduct())}
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
