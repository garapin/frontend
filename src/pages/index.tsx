import Head from "next/head";
import GarapinAppBar from "@/components/GarapinAppBar";
import Box from "@mui/material/Box";
import GarapinFooter from "@/components/GarapinFooter";
import Typography from "@mui/material/Typography";
import RoundedImage from "@/components/RoundedImage";
import * as React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { i18n, Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import { useRouter } from "next/router";
import CardCategories from "@/components/CardCategories";
import ProductList from "@/components/ProductList/ProductList";
import { AppState, wrapper } from "@/store";
import { getAllProducts, getAllCategories } from "@/store/modules/products";
import { connect } from "react-redux";
import Image from "next/image";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { toast } from "react-toastify";
import { ArrowBack, East, KeyboardBackspace } from "@mui/icons-material";
import { SearchPackageIconSVG } from "@/assets/icons/search-package-icon";
import { OrderPackageIconSVG } from "@/assets/icons/order-package-icon";
import { ShippingPackageIconSVG } from "@/assets/icons/shipping-package-icon";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#713F97",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 3),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
    },
  },
}));
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
    srcUrl:
      "https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    srcUrl:
      "https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const dummyImg =
  "https://images.unsplash.com/photo-1603695762547-fba8b88ac8ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80";

function LandingPage(props: any) {
  const { t } = useTranslation("landing");
  const { t: tCom } = useTranslation("common");
  const router = useRouter();
  const auth = useFirebaseAuth();
  const fieldRef = React.useRef<HTMLFormElement>(null);
  const [checkVerified, setCheckVerified] = React.useState(false);
  const [tabVal, setTabVal] = React.useState(0);

  const handleChangeTabVal = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabVal(newValue);
  };

  const handleSubmit = (event: any) => {
    router.push(
      `search${
        fieldRef?.current?.value !== undefined
          ? `?q=${fieldRef?.current?.value}`
          : ""
      }`
    );
  };
  const productList = props?.product?.products;
  const categories = props?.product?.category;

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

  return (
    <>
      <Head>
        <title>Garapin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box className="flex flex-col pb-20 content-center max-w-md mx-auto">
          <Box className="h-min-screen flex flex-col justify-center bg-white space-y-4">
            <ImageCarousel
              dataSource={imageSet}
              maxHeight={413}
              maxWidth={627}
              withThumbnail={false}
              useMagnifier={false}
              rsProps={{
                autoplay: true,
                autoplaySpeed: 4000,
                infinite: true,
              }}
              className="py-0 w-full h-1/3 object-cover"
            />
            <Container maxWidth="sm" className="px-4">
              <Box>
                <Box className="space-y-4">
                  <Typography
                    variant="body1"
                    color="primary"
                    className="text-[#344289] text-lg font-bold max-w-xs"
                  >
                    <Trans>{t("section1.tagline")}</Trans>
                  </Typography>
                  <Typography
                    variant="h2"
                    className="text-[32px] font-semibold max-w-xs"
                  >
                    <Trans>{t("section1.header")}</Trans>
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-md text-slate-600"
                  >
                    <Trans>{t("section1.content")}</Trans>
                  </Typography>
                  <Button variant="contained" className="py-3">
                    Buat Kemasan
                  </Button>
                  <div className="arrows">
                    <IconButton color="primary">
                      <KeyboardBackspace />
                    </IconButton>
                    <IconButton color="primary" className="bg-[#713F97]">
                      <East className="text-white" />
                    </IconButton>
                  </div>
                </Box>
                <Box className="max-w-xl mt-20 mb-20 space-y-6" columnGap={2}>
                  <p className="text-[32px] font-semibold text-center max-w-xs mx-auto">
                    {t("section1.order_guide")}{" "}
                    <span className="text-[#713F97]">
                      {t("section1.order_guide_tagline")}
                    </span>
                  </p>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      className="bg-slate-50 w-full space-y-6 rounded-lg px-4 py-6 mb-4"
                    >
                      <IconButton color="primary" className="bg-[#00C198]">
                        <SearchPackageIconSVG className="text-white" />
                      </IconButton>
                      <p className="text-[22px] font-semibold">
                        {t("section2.grid.grid1.header")}
                      </p>
                      <p className="text-slate-600 leading-6">
                        {t("section2.grid.grid1.description")}
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="bg-slate-50 w-full space-y-6 rounded-lg px-4 py-6 mb-4"
                    >
                      <IconButton color="primary" className="bg-[#01959C]">
                        <OrderPackageIconSVG className="text-white" />
                      </IconButton>
                      <p className="text-[22px] font-semibold">
                        {t("section2.grid.grid2.header")}
                      </p>
                      <p className="text-slate-600 leading-6">
                        {t("section2.grid.grid2.description")}
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="bg-slate-50 w-full space-y-6 rounded-lg px-4 py-6"
                    >
                      <IconButton color="primary" className="bg-[#11788F]">
                        <ShippingPackageIconSVG className="text-white" />
                      </IconButton>
                      <p className="text-[22px] font-semibold">
                        {t("section2.grid.grid3.header")}
                      </p>
                      <p className="text-slate-600 leading-6">
                        {t("section2.grid.grid3.description")}
                      </p>
                    </Grid>
                  </Grid>
                  {/* <TextField
                    placeholder={`${t("section1.searchbar")}`}
                    fullWidth
                    inputRef={fieldRef}
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        handleSubmit(event);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            color="garapinColor"
                            onClick={handleSubmit}
                          >
                            {t("section1.searchButton")}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField> */}
                </Box>
                <Box className="mt-20 space-y-6">
                  <h2 className="font-semibold text-[32px] text-center max-w-sm">
                    {t("sectionJelajah.header")}{" "}
                    <span className="text-[#713F97]">
                      {t("sectionJelajah.category")}
                    </span>
                  </h2>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      className="mb-2 relative group hover:cursor-pointer overflow-hidden"
                      onClick={() =>
                        router.push("/product-category/custom-packaging")
                      }
                    >
                      <Image
                        src="/assets/custom-packaging-cover.png"
                        alt="custom packaging"
                        width={600}
                        height={600}
                        className="w-full h-full object-contain group-hover:transform group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute bottom-6 left-4 pr-4 text-white space-y-2">
                        <p className="uppercase font-bold text-2xl">
                          {t("sectionJelajah.custom_packaging.header")}
                        </p>
                        <p className="font-light leading-5">
                          {t("sectionJelajah.custom_packaging.desc")}
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="mb-2 relative group hover:cursor-pointer overflow-hidden"
                      onClick={() =>
                        router.push("/product-category/ready-to-buy")
                      }
                    >
                      <Image
                        src="/assets/ready-to-buy-cover.png"
                        alt="ready-to-buy"
                        width={600}
                        height={600}
                        className="w-full h-full object-contain group-hover:transform group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute bottom-6 left-4 pr-4 text-white space-y-2">
                        <p className="uppercase font-bold text-2xl">
                          {t("sectionJelajah.ready_to_buy.header")}
                        </p>
                        <p className="font-light leading-5">
                          {t("sectionJelajah.ready_to_buy.desc")}
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="relative group hover:cursor-pointer overflow-hidden"
                      onClick={() =>
                        router.push("/product-category/digital-packaging")
                      }
                    >
                      <Image
                        src="/assets/digital-packaging-cover.png"
                        alt="digital packaging"
                        width={600}
                        height={600}
                        className="w-full h-full object-contain group-hover:transform group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute bottom-6 left-4 pr-4 text-white space-y-2">
                        <p className="uppercase font-bold text-2xl">
                          {t("sectionJelajah.digital_packaging.header")}
                        </p>
                        <p className="font-light leading-5">
                          {t("sectionJelajah.digital_packaging.desc")}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="mt-20 space-y-6">
                  <h2 className="font-semibold text-[32px] max-w-sm">
                    {t("section_recomendation.title")}
                  </h2>
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
                  <div className="flex items-center justify-center pt-4">
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
                  <div className="flex flex-col justify-center items-center gap-16">
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
                <Box className="mt-20 py-16 px-10 text-center space-y-4 bg-[#713F97] rounded-2xl text-white">
                  <h2 className="font-normal text-[32px] max-w-sm text-center mx-auto">
                    {t("section_consultation.title")}
                  </h2>
                  <p className="leading-6">
                    {t("section_consultation.description")}
                  </p>
                  <Button
                    variant="contained"
                    className="text-[#713F97] bg-white capitalize"
                  >
                    {t("section_consultation.button")}
                  </Button>
                </Box>
                <Box className="mt-20">
                  <Accordion className="shadow-lg p-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="text-lg font-medium max-w-xs">
                        Garapin, Pembuatan Packaging Terpercaya Di Indonesia
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet consectetur. In enim
                        elementum tellus adipiscing lorem. At enim eget sit
                        donec. Pellentesque lorem in viverra amet aliquam
                        potenti nullam porta. Cras neque condimentum fringilla
                        sit purus vitae. Tellus convallis tristique purus mattis
                        purus purus sagittis egestas. Augue enim dis lectus
                        tempor praesent. Ultrices in nunc mi egestas adipiscing
                        est viverra. Dignissim duis orci sagittis et. Porttitor
                        sed neque tincidunt euismod.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
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
