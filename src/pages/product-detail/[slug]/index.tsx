import LoginPage from "@/pages/login";
import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import FallbackSpinner from "@/components/spinner";
import {
  getSingleProduct,
  setCalculateTemplatePrice,
} from "@/store/modules/products";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ImageCarousel from "@/components/ImageCarousel";
import { getCategoryLabel } from "@/tools/utils";
import { Star } from "@mui/icons-material";
import { ShoppingBagIconSVG } from "@/assets/icons/shopping-bag-icon";
import { TimeIconSVG } from "@/assets/icons/time-icon";
import ModalLogin from "@/components/ModalLogin";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import SocialShare from "@/components/SocialShare";
import Consultation from "@/components/Consultation";
import GarapinFAQ from "@/components/GarapinFAQ";
import { rupiah } from "@/tools/rupiah";

const ProductDetailPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { slug } = router.query;
  const { isProductLoading, singleProduct } = useAppSelector(
    (state) => state.product
  );
  const auth = useFirebaseAuth();
  const [showRating, setShowRating] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  React.useEffect(() => {
    if (slug !== undefined) {
      dispatch(getSingleProduct(slug as string));
    }
  }, [slug]);

  React.useEffect(() => {
    dispatch(setCalculateTemplatePrice(null));
  }, []);

  if (isProductLoading) {
    return <FallbackSpinner />;
  } else {
    return (
      <>
        <Box className="items-center lg:py-10">
          <Grid
            maxWidth="lg"
            container
            className="max-w-screen-2xl mx-auto justify-between px-4"
          >
            <Grid
              item
              xs={12}
              lg={6}
              alignItems="center"
              justifyContent="center"
              className="w-full lg:pr-6 lg:space-y-2"
            >
              <ImageCarousel
                dataSource={
                  singleProduct?.img?.map((image: any) => {
                    return {
                      srcUrl: image,
                    };
                  }) ?? []
                }
              />
              <SocialShare />
            </Grid>
            <Grid item xs={12} lg={6} className="w-full space-y-4 lg:pl-6">
              <Typography
                className="text-[#713F97] text-sm font-semibold"
                variant="body1"
              >
                {getCategoryLabel(singleProduct.category)}
              </Typography>
              <Typography className="text-[32px] font-semibold" variant="h4">
                {singleProduct?.productName}
              </Typography>
              {showRating && (
                <div className="lg:flex lg:items-center lg:gap-10">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xl">
                      {singleProduct?.reviews ?? 0}
                    </span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        fontSize="medium"
                        className={`${
                          i + 1 <= singleProduct?.reviews ?? 0
                            ? "text-yellow-500"
                            : "text-slate-500"
                        }`}
                      />
                    ))}
                    <Typography
                      className="text-slate-600 text-xl"
                      variant="body1"
                    >
                      {`(16,325)`}
                    </Typography>
                  </div>
                  <Typography
                    className="text-slate-600 text-xl font-bold"
                    variant="body1"
                  >
                    2789 Sold
                  </Typography>
                </div>
              )}
              {singleProduct?.category === "01" ? (
                <Typography
                  className="text-[26px] font-semibold"
                  variant="h5"
                  color="#713F97"
                >
                  {rupiah(singleProduct?.productPrice)}
                </Typography>
              ) : (
                <Typography
                  className="text-[26px] font-semibold"
                  variant="h5"
                  color="#713F97"
                >
                  {rupiah(singleProduct?.minPrice)} -
                  {rupiah(singleProduct?.maxPrice)} / pcs
                </Typography>
              )}

              <Button
                variant="contained"
                className="capitalize py-3"
                fullWidth
                onClick={() => {
                  if (auth.authUser === null) {
                    handleOpenLogin();
                    return;
                  }
                  router.push(`/product-detail/${singleProduct?.slug}/create`);
                }}
              >
                {singleProduct?.category === "01"
                  ? "Beli Sekarang"
                  : "Minta Penawaran"}
              </Button>

              <Box className="pt-2 space-y-4">
                <Typography className="font-semibold text-2xl" variant="h2">
                  Info Pemesanan
                </Typography>
                <Box className="space-y-4 lg:space-y-0 lg:flex lg:items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBagIconSVG />
                    <Typography
                      variant="body2"
                      className="text-[22px] font-light text-slate-600"
                    >
                      Minimal. Pemesananan
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    className="text-[22px] font-light text-[#713F97]"
                  >
                    {singleProduct?.moq?.toLocaleString("id-ID")} pcs
                  </Typography>
                </Box>
                <Box className="space-y-4 lg:space-y-0 lg:flex lg:items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TimeIconSVG />
                    <Typography
                      variant="body2"
                      className="text-[22px] font-light text-slate-600"
                    >
                      Lama Pengerjaan (per karton)
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    className="text-[22px] font-light text-[#713F97]"
                  >
                    {singleProduct?.leadTime} hari
                  </Typography>
                </Box>
                {/* <Box className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TruckIconSVG />
                    <Typography
                      variant="body2"
                      className="text-[22px] font-light text-slate-600"
                    >
                      Dikirim Dari
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    className="text-[22px] font-light text-[#713F97]"
                  >
                    Jawa Tengah
                  </Typography>
                </Box> */}
              </Box>

              <Box className="flex flex-col">
                <Box className="mb-8 space-y-4">
                  <Typography className="font-semibold" variant="h5">
                    Tentang Produk
                  </Typography>
                  <Typography
                    className="text-base text-slate-700"
                    variant="body2"
                  >
                    {singleProduct?.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <div className="max-w-screen-2xl mx-auto">
            <Consultation className="mt-10" />
            <GarapinFAQ className="my-16" />
          </div>
        </Box>
        <ModalLogin openLogin={openLogin} handleCloseLogin={handleCloseLogin} />
      </>
    );
  }
};

LoginPage.authGuard = false;
LoginPage.guestGuard = false;

export default ProductDetailPage;

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
