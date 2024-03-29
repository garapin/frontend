import Head from "next/head";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";
import { i18n, Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { makeStyles } from "@mui/styles";
import { Container, Grid, IconButton, Tab, Tabs } from "@mui/material";
import { CarouselImageSet } from "@/components/ImageCarousel";
import Slider from "react-slick";
import { useRouter } from "next/router";
import ProductList from "@/components/ProductList/ProductList";
import { AppState, wrapper } from "@/store";
import { getAllProducts, getAllCategories } from "@/store/modules/products";
import { connect } from "react-redux";
import Image from "next/image";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { toast } from "react-toastify";
import { East, KeyboardBackspace } from "@mui/icons-material";
import { SearchPackageIconSVG } from "@/assets/icons/search-package-icon";
import { OrderPackageIconSVG } from "@/assets/icons/order-package-icon";
import { ShippingPackageIconSVG } from "@/assets/icons/shipping-package-icon";
import Consultation from "@/components/Consultation";
import GarapinFAQ from "@/components/GarapinFAQ";

const settingsSlider = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

makeStyles({
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "50%",
  },
  card: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1%",
  },
});

const imageSet: CarouselImageSet[] = [
  {
    srcUrl: "/assets/slider-1.png",
  },
  {
    srcUrl:
      "https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

function LandingPage(props: any) {
  const { t } = useTranslation("landing");
  const { t: tCom } = useTranslation("common");
  const router = useRouter();
  const auth = useFirebaseAuth();
  const fieldRef = React.useRef<HTMLFormElement>(null);
  const [checkVerified, setCheckVerified] = React.useState(false);
  const [tabVal, setTabVal] = React.useState(0);
  const [productList, setProductList] = React.useState(
    props?.product?.products
  );
  const slider = React.useRef<Slider>(null);

  const handleChangeTabVal = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabVal(newValue);
  };
  React.useEffect(() => {
    const vr = router.query.verified;
    if (
      vr === "true" &&
      auth.authUser !== undefined &&
      auth.authUser?.emailVerified &&
      !checkVerified
    ) {
      toast.success(tCom("email.verified"));
      setCheckVerified(true);
    }
  }, [router.query.verified, auth.authUser, tCom, checkVerified]);

  React.useEffect(() => {
    if (tabVal == 1) {
      setProductList(
        props?.product?.products.filter(
          (product: any) => product.category == "01"
        )
      );
    } else if (tabVal == 2) {
      setProductList(
        props?.product?.products.filter(
          (product: any) => product.category == "02"
        )
      );
    } else if (tabVal == 3) {
      setProductList(
        props?.product?.products.filter(
          (product: any) => product.category == "03"
        )
      );
    } else {
      setProductList(props?.product?.products);
    }
  }, [tabVal]);

  const jelajahMenus = [
    {
      img: "/assets/custom-packaging-cover.png",
      header: t("sectionJelajah.custom_packaging.header"),
      desc: t("sectionJelajah.custom_packaging.desc"),
      link: "/product-list?category=03",
    },
    {
      img: "/assets/ready-to-buy-cover.png",
      header: t("sectionJelajah.ready_to_buy.header"),
      desc: t("sectionJelajah.ready_to_buy.desc"),
      link: "/product-list?category=01",
    },
    {
      img: "/assets/digital-packaging-cover.png",
      header: t("sectionJelajah.digital_packaging.header"),
      desc: t("sectionJelajah.digital_packaging.desc"),
      link: "/product-list?category=02",
    },
  ];

  const carousel = [
    {
      id: 1,
      srcUrl: "/assets/slider-1.png",
      tagline: t("section1.tagline"),
      header: t("section1.header"),
      content: t("section1.content"),
      button: t("create_packaging"),
    },
    {
      id: 1,
      srcUrl: "/assets/buat-packaging.png",
      tagline: t("section1.tagline"),
      header: "Mulai Buat Packaging Kalian di heiPack",
      content: t(
        "Raih kesan pertama yang memukau dengan packaging makanan premium khusus bisnis online! Desain elegan, tahan bocor, dan ramah lingkungan. Pastikan makanan Anda sampai dengan sempurna. Tingkatkan citra brand, kepuasan pelanggan, dan ulasan positif. Investasi terbaik untuk bisnis kuliner Anda. Pesan sekarang, jadikan unggulan bisnismu dan berikan pengalaman tak terlupakan untuk pelanggan!"
      ),
      button: t("create_packaging"),
    },
  ];
  return (
    <>
      <Head>
        <title>Garapin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box className="flex flex-col pb-20 content-center max-w-screen-2xl mx-auto">
          <Box className="h-min-screen flex flex-col justify-center bg-white space-y-4">
            <Slider {...settingsSlider} ref={slider}>
              {carousel.map((item, index) => (
                <div className="grid grid-cols-12">
                  <div className="col-span-12 lg:col-span-6 lg:order-2">
                    <img src={item.srcUrl} alt="garapin" className="w-full" />
                  </div>
                  <div className="col-span-12 lg:col-span-6 lg:order-1 lg:flex lg:items-center">
                    <Box className="space-y-4 px-4">
                      <Typography
                        variant="body1"
                        color="primary"
                        className="text-[#344289] text-lg font-bold max-w-xs lg:max-w-xl"
                      >
                        <Trans>{item.tagline}</Trans>
                      </Typography>
                      <Typography
                        variant="h2"
                        className="text-[32px] lg:text-[60px] font-semibold max-w-xs lg:max-w-xl"
                      >
                        <Trans>{item.header}</Trans>
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-md text-slate-600 lg:max-w-xl"
                      >
                        <Trans>{item.content}</Trans>
                      </Typography>
                      <Button
                        variant="contained"
                        className="py-3"
                        onClick={() => {
                          const element = document.getElementById(
                            "recomendation-product"
                          );
                          element?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item.button}
                      </Button>
                      <div className="arrows">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            slider.current?.slickPrev();
                          }}
                        >
                          <KeyboardBackspace />
                        </IconButton>
                        <IconButton
                          color="primary"
                          className="bg-[#713F97]"
                          onClick={() => {
                            slider.current?.slickNext();
                          }}
                        >
                          <East className="text-white" />
                        </IconButton>
                      </div>
                    </Box>
                  </div>
                </div>
              ))}
            </Slider>
            <Container className="px-4 max-w-screen-2xl">
              <Box>
                <Box
                  className="max-w-screen-2xl mt-20 mb-20 space-y-6"
                  columnGap={2}
                >
                  <p className="text-[32px] font-semibold text-center lg:text-start max-w-xs mx-auto md:max-w-md md:mx-0">
                    {t("section1.order_guide")}{" "}
                    <span className="text-[#713F97]">
                      {t("section1.order_guide_tagline")}
                    </span>
                  </p>
                  <div className="grid grid-cols-12 gap-4 md:gap-8 lg:gap-16">
                    <div className="bg-slate-50 w-full space-y-6 rounded-lg px-4 py-6 mb-4 col-span-12 md:col-span-6 lg:col-span-4">
                      <IconButton color="primary" className="bg-[#00C198]">
                        <SearchPackageIconSVG className="text-white" />
                      </IconButton>
                      <p className="text-[22px] font-semibold">
                        {t("section2.grid.grid1.header")}
                      </p>
                      <p className="text-slate-600 leading-6">
                        {t("section2.grid.grid1.description")}
                      </p>
                    </div>
                    <div className="bg-slate-50 w-full space-y-6 rounded-lg px-4 py-6 mb-4 col-span-12 md:col-span-6 lg:col-span-4">
                      <IconButton color="primary" className="bg-[#01959C]">
                        <OrderPackageIconSVG className="text-white" />
                      </IconButton>
                      <p className="text-[22px] font-semibold">
                        {t("section2.grid.grid2.header")}
                      </p>
                      <p className="text-slate-600 leading-6">
                        {t("section2.grid.grid2.description")}
                      </p>
                    </div>
                    <div className="bg-slate-50 w-full space-y-6 rounded-lg px-4 py-6 mb-4 col-span-12 md:col-span-6 lg:col-span-4">
                      <IconButton color="primary" className="bg-[#11788F]">
                        <ShippingPackageIconSVG className="text-white" />
                      </IconButton>
                      <p className="text-[22px] font-semibold">
                        {t("section2.grid.grid3.header")}
                      </p>
                      <p className="text-slate-600 leading-6">
                        {t("section2.grid.grid3.description")}
                      </p>
                    </div>
                  </div>
                </Box>
                <Box className="mt-20 space-y-6">
                  <h2 className="font-semibold text-[32px] text-center max-w-sm mx-auto md:max-w-xl md:leading-10">
                    {t("sectionJelajah.header")}{" "}
                    <span className="text-[#713F97]">
                      {t("sectionJelajah.category")}
                    </span>
                  </h2>
                  <Grid container className="lg:hidden">
                    {jelajahMenus.map((menu, index) => (
                      <Grid
                        item
                        key={index}
                        xs={12}
                        className="mb-2 relative group hover:cursor-pointer overflow-hidden"
                        onClick={() => router.push(menu.link)}
                      >
                        <Image
                          src={menu.img}
                          alt={menu.header}
                          width={600}
                          height={600}
                          className="w-full h-full object-contain group-hover:transform group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute bottom-6 left-4 pr-4 text-white space-y-2">
                          <p className="uppercase font-bold text-2xl">
                            {menu.header}
                          </p>
                          <p className="font-light leading-5">{menu.desc}</p>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                  <div className="hidden lg:grid grid-cols-12 gap-4 w-full">
                    <div
                      className="col-span-6 relative cursor-pointer"
                      onClick={() => router.push(jelajahMenus[0].link)}
                    >
                      <img
                        src={"assets/cp-cat.png"}
                        alt={jelajahMenus[0].header}
                        className="flex-1 h-full w-full"
                      />
                      <div className="absolute bottom-12 left-12 pr-4 max-w-xs text-white space-y-2">
                        <p className="uppercase font-bold text-2xl">
                          {jelajahMenus[0].header}
                        </p>
                        <p className="font-light leading-5">
                          {jelajahMenus[0].desc}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 space-y-4">
                      <div
                        className="relative cursor-pointer"
                        onClick={() => router.push(jelajahMenus[1].link)}
                      >
                        <img
                          src={"assets/rtb-cat.png"}
                          alt={jelajahMenus[1].header}
                          className="w-full object-cover"
                        />
                        <div className="absolute bottom-8 left-8 pr-4 max-w-xs text-white space-y-2">
                          <p className="uppercase font-bold text-2xl">
                            {jelajahMenus[1].header}
                          </p>
                          <p className="font-light leading-5">
                            {jelajahMenus[1].desc}
                          </p>
                        </div>
                      </div>
                      <div
                        className="relative cursor-pointer"
                        onClick={() => router.push(jelajahMenus[2].link)}
                      >
                        <img
                          src={"assets/dp-cat.png"}
                          alt={jelajahMenus[2].header}
                          className="w-full object-cover"
                        />
                        <div className="absolute bottom-8 left-8 pr-4 max-w-xs text-white space-y-2">
                          <p className="uppercase font-bold text-2xl">
                            {jelajahMenus[2].header}
                          </p>
                          <p className="font-light leading-5">
                            {jelajahMenus[2].desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
                <Box className="mt-20 space-y-6" id="recomendation-product">
                  <div className="lg:flex items-center justify-between">
                    <h2 className="font-semibold text-[32px] max-w-sm lg:max-w-xl">
                      {t("section_recomendation.title")}
                    </h2>
                    <Button
                      variant="text"
                      className="max-w-fit capitalize text-lg font-medium hidden lg:block"
                      onClick={() => router.push("/product-list")}
                    >
                      {t("sectionJelajah.viewAllButton")}
                    </Button>
                  </div>
                  <Tabs
                    value={tabVal}
                    onChange={handleChangeTabVal}
                    variant="scrollable"
                    scrollButtons={false}
                    textColor="inherit"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#F5F5F5",
                        // height full
                        height: "100%",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <Tab className="z-10 px-6" label="Semua" />
                    <Tab className="z-10 px-6" label="Ready to Buy" />
                    <Tab className="z-10 px-6" label="Digital Packaging" />
                    <Tab className="z-10 px-6" label="Custom Packaging" />
                  </Tabs>
                  {/* {tabVal === 0 && ( */}
                  <Grid container spacing={3}>
                    <ProductList productList={productList} />
                  </Grid>
                  <div className="flex items-center justify-center pt-4 lg:hidden">
                    <Button
                      variant="text"
                      className="max-w-fit capitalize text-lg font-medium"
                      onClick={() => router.push("/product-list")}
                    >
                      {t("sectionJelajah.viewAllButton")}
                    </Button>
                  </div>
                  {/* )} */}
                </Box>
                <Box className="mt-20 space-y-16">
                  <h2 className="font-semibold text-[32px] max-w-sm text-center mx-auto">
                    {t("section_happy_client.title")}
                  </h2>
                  <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-28">
                    <img
                      src="/assets/bca-logo.png"
                      alt="bca"
                      className="h-16"
                    />
                    <img
                      src="/assets/honda-logo.png"
                      alt="honda"
                      className="h-16"
                    />
                    <img
                      src="/assets/tokopedia-logo.png"
                      alt="tokopedia"
                      className="h-16"
                    />
                  </div>
                </Box>
                <Consultation className="mt-20" />
                <GarapinFAQ className="mt-20" />
              </Box>
            </Container>
          </Box>
        </Box>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale }: { locale: string }) => {
      await store.dispatch(getAllCategories());
      await store.dispatch(getAllProducts());
      if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
      }

      return {
        props: {
          ...(await serverSideTranslations(locale, ["landing", "common"])),
        },
      };
    }
);

const mapStateToProps = (state: AppState) => ({
  product: state.product,
});

export default connect(mapStateToProps)(LandingPage);
