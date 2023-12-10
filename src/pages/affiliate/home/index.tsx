import { CalendarIconSVG } from "@/assets/icons/calendar-icon";
import { SearchIconSVG } from "@/assets/icons/search-icon";
import CardAffiliate from "@/components/CardAffiiate";
import GASSAppBar from "@/components/GASSAppBar";
import NoResult from "@/components/NoResult";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { useAppSelector } from "@/hooks/useAppRedux";
import {
  getNextSearchProduct,
  getSearchProduct,
} from "@/store/modules/products";
import { getProductPrice } from "@/tools/rupiah";
import { getCategoryLabel } from "@/tools/utils";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Popover,
  TextField,
} from "@mui/material";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useDispatch } from "react-redux";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

const AffiliateHome = () => {
  const dispatch = useDispatch();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const {
    products,
    isProductLoading,
    allProductsLoaded,
    isFetchingNext,
    searchHit,
  } = useAppSelector((state) => state.product);
  const [showDateRange, setShowDateRange] = React.useState(null);
  const [dateRange, setDateRange] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  React.useEffect(() => {
    dispatch(
      getSearchProduct({
        query: "",
        category: [],
      }) as any
    );
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    const query = searchRef.current?.value;
    dispatch(
      getSearchProduct({
        query: query ?? "",
        category: [],
      }) as any
    );
  };

  return (
    <div className="bg-slate-50">
      <GASSAppBar />
      <div className="max-w-screen-2xl mx-auto py-8 space-y-8">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="font-medium text-[32px] mb-2">Performa Affiliate</h2>
            <p className="text-slate-500">
              Rutin pantau performa hasil link kamu.
            </p>
          </div>
          <div
            className="flex items-center gap-2 bg-[#713F97] hover:bg-[#713F97]/90 px-4 py-4 rounded-md text-white cursor-pointer"
            onClick={(e: any) => setShowDateRange(e.currentTarget)}
          >
            <CalendarIconSVG />
            <p>Pilih Rentang Tanggal</p>
          </div>
          <Popover
            id="range-date-popover"
            open={Boolean(showDateRange)}
            anchorEl={showDateRange}
            onClose={() => setShowDateRange(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="p-4">
              <DateRangePicker
                onChange={(item: any) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={dateRange}
                direction="horizontal"
                className="w-full"
              />
              <div className="flex justify-end gap-4">
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowDateRange(null);
                  }}
                >
                  OK
                </Button>
              </div>
            </div>
          </Popover>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="grid col-span-4 bg-white p-4 rounded-md">
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/affiliate/commission.svg" />
              <p className="text-slate-500">Total Komisi</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[24px] font-medium">Rp.0</p>
              <p className="text-green-500">Rp.0</p>
            </div>
            <Divider className="my-4" />
            <div className="grid grid-cols-12 gap-4">
              <div className="grid col-span-4 space-y-2">
                <p className="text-slate-500 text-xs">Komisi Kunjungan</p>
                <p className="text-[14px] font-medium">Rp.0</p>
                <p className="text-green-500 text-xs">Rp.0</p>
              </div>
              <div className="grid col-span-4 space-y-2">
                <p className="text-slate-500 text-xs">Komisi Penjualan</p>
                <p className="text-[14px] font-medium">Rp.0</p>
                <p className="text-green-500 text-xs">Rp.0</p>
              </div>
              <div className="grid col-span-4 space-y-2">
                <p className="text-slate-500 text-xs">Terjual</p>
                <p className="text-[14px] font-medium">Rp.0</p>
                <p className="text-green-500 text-xs">Rp.0</p>
              </div>
            </div>
          </div>
          <div className="grid col-span-4 bg-white p-4 rounded-md">
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/affiliate/click.svg" />
              <p className="text-slate-500">Total Klik</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[24px] font-medium">0</p>
              <p className="text-green-500">0</p>
            </div>
            <Divider className="my-4" />
            <div className="grid grid-cols-12 gap-4">
              <div className="grid col-span-3 space-y-2">
                <p className="text-slate-500 text-xs">Kunjungan Produk</p>
                <p className="text-[14px] font-medium">0</p>
                <p className="text-green-500 text-xs">0</p>
              </div>
              <div className="grid col-span-3 space-y-2">
                <p className="text-slate-500 text-xs">Kunjungan Koleksi</p>
                <p className="text-[14px] font-medium">0</p>
                <p className="text-green-500 text-xs">0</p>
              </div>
              <div className="grid col-span-3 space-y-2">
                <p className="text-slate-500 text-xs">Kunjungan Toko</p>
                <p className="text-[14px] font-medium">0</p>
                <p className="text-green-500 text-xs">0</p>
              </div>
              <div className="grid col-span-3 space-y-2">
                <p className="text-slate-500 text-xs">Kunjungan Event</p>
                <p className="text-[14px] font-medium">0</p>
                <p className="text-green-500 text-xs">0</p>
              </div>
            </div>
          </div>
          <div className="grid col-span-4 bg-white p-4 rounded-md">
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/affiliate/sales-check.svg" />
              <p className="text-slate-500">Total Terjual</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[24px] font-medium">0</p>
              <p className="text-green-500">0</p>
            </div>
            <Divider className="my-4" />
            <div className="grid grid-cols-12 gap-4">
              <div className="grid col-span-4 space-y-2">
                <p className="text-slate-500 text-xs">Ready to Buy</p>
                <p className="text-[14px] font-medium">0</p>
                <p className="text-green-500 text-xs">0</p>
              </div>
              <div className="grid col-span-4 space-y-2">
                <p className="text-slate-500 text-xs">Custom Packaging</p>
                <p className="text-[14px] font-medium">0</p>
                <p className="text-green-500 text-xs">0</p>
              </div>
              <div className="grid col-span-4 space-y-2">
                <p className="text-slate-500 text-xs">Digital Packaging</p>
                <p className="text-[14px] font-medium">0</p>
                <p className="text-green-500 text-xs">0</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-md space-y-4">
          <div className="space-y-2">
            <h2 className="font-medium text-2xl">
              Promosinya gampang, Komisinya dapet
            </h2>
            <p className="text-slate-500">
              Punya produk & packaging favoritmu? Kamu bisa promosikan link-nya
              dengan cara-cara mudah yang bisa dipilih! Cek cara promosikan
            </p>
          </div>
          <Box className="shadow-sm border-t border-slate-700 max-w-screen-2xl mx-auto flex items-stretch gap-2 bg-white mb-4">
            <TextField
              placeholder="Cari Produk Packaging"
              fullWidth
              inputRef={searchRef}
              InputProps={{
                startAdornment: (
                  <IconButton type="submit">
                    <SearchIconSVG className="w-6 h-6 text-black" />
                  </IconButton>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            ></TextField>

            <Button
              variant="contained"
              className="rounded-md capitalize"
              onClick={handleSearch}
            >
              Cek
            </Button>
          </Box>
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
                        <CardAffiliate
                          key={product.id}
                          imageUrl={
                            (product.img &&
                              product.img.length > 0 &&
                              product.img[0]) ??
                            imagePlaceholder
                          }
                          productName={product.productName}
                          price={getProductPrice(product)}
                          slug={product.slug?.toString() ?? product.sku}
                          category={getCategoryLabel(product.category)}
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
                onClick={() => dispatch(getNextSearchProduct() as any)}
              >
                Load more... {isFetchingNext && <CircularProgress size={10} />}
              </Button>
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

AffiliateHome.showAppBar = false;
AffiliateHome.showFooter = false;

export default AffiliateHome;

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
