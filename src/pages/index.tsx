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
import CardVertical from "@/components/CardVertical";
import {
  Container,
  Divider,
  Grid,
  InputAdornment,
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
  const { t:tCom } = useTranslation("common");
  const router = useRouter();
  const auth = useFirebaseAuth();
  const fieldRef = React.useRef<HTMLFormElement>(null);
  const [checkVerified, setCheckVerified] = React.useState(false);
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
    if (vr === "true" && auth.authUser !== undefined && auth.authUser?.emailVerified && !checkVerified) {
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
        <Box className="flex flex-col content-center">
          {/* <GarapinAppBar/> */}
          <Box className="h-min-screen flex flex-col justify-center bg-white">
            <Container
              maxWidth="xl"
              className="px-4 md:px-16 pt-36 pb-28 md:pt-48 md:pb-48"
            >
              <Box>
                <Box className="max-w-xl xl:max-w-full">
                  <Typography variant="h3" color="primary" className="mb-8">
                    <Trans>
                      {t("section1.header")}
                      <b></b>
                    </Trans>
                  </Typography>
                  <Typography variant="body1">
                    <Trans>{t("section1.content")}</Trans>
                  </Typography>
                </Box>
                <Box className="max-w-xl mt-24 mb-20">
                  <TextField
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
                  ></TextField>
                </Box>
                <Box className="mt-28">
                  <Typography variant="body1">
                    {t("section1.credentials")}
                  </Typography>
                  <Box className="flex items-center mt-7">
                    <svg
                      width="150"
                      height="48"
                      viewBox="0 0 150 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-10"
                    >
                      <path
                        d="M81.4312 22.8485C90.9204 18.4633 92.3238 4.15308 78.8261 4.15308H63.1949L57.4184 15.6936H60.1368L53.2274 43.2752H71.3503C84.5718 43.3904 90.518 27.5279 81.4312 22.8485ZM71.3503 33.2351H66.8195L68.5185 27.0034H72.8225C77.9196 28.0418 74.7485 33.4658 71.3503 33.2351ZM74.0687 19.9633H70.2177L71.3503 14.5394H75.6543C79.8131 15.5781 76.221 20.1943 74.0687 19.9633Z"
                        fill="#AFA9B1"
                      />
                      <path
                        d="M118.537 18.8918L124.471 8.21864L116.442 3.95122L115.394 5.26825C111.063 2.93202 88.3802 6.15773 86.96 28.9551C87.8089 48.0794 108.842 44.6393 110.905 43.4258L116.689 31.242C111.024 35.0442 99.4232 36.8695 98.9324 25.4481C99.95 16.0298 110.864 12.5125 118.537 18.8918ZM148.149 4.15308H129.906L124.108 15.3481H127.087L113.339 43.2752H126.646L129.378 36.5392H137.547L137.75 43.2752H150L148.149 4.15308ZM133.079 27.47L137.546 16.6052L137.75 27.47H133.079Z"
                        fill="#AFA9B1"
                      />
                      <path
                        d="M34.2263 41.4076L34.9349 41.1981L34.1577 40.1038L34.2263 41.4076ZM22.5919 41.2213L22.4548 42.1995C22.8075 42.1644 23.2418 42.4741 23.4149 41.7802C23.4019 41.2395 22.9979 41.2097 22.5919 41.2213ZM28.2379 41.1981C28.1791 40.9317 27.9609 40.7355 27.4149 40.9188L27.5978 41.9198C28.0463 41.8186 28.2769 41.5482 28.2379 41.1981ZM15.4834 40.3788L15.2651 41.2683C15.6159 41.2832 16.0267 41.573 16.2596 41.0459C16.2752 40.7157 16.2885 40.3867 15.4834 40.3788ZM27.7579 42.6654L27.918 43.6902C28.2925 43.6998 28.6342 43.4705 28.5351 42.9917C28.4396 42.531 28.0599 42.6038 27.7579 42.6654Z"
                        fill="#AFA9B1"
                      />
                      <path
                        d="M42.6225 4.68055C30.5189 -1.60178 16.0638 -1.42706 4.53136 4.40656C-1.41541 15.0728 -1.60476 29.9965 4.53136 43.2144C17.2365 49.7651 31.2886 49.3335 42.7119 43.4883C48.0805 32.2662 48.9672 18.7624 42.6225 4.68055ZM22.1807 36.53L21.4633 36.5383C21.2856 34.5184 20.8118 32.8208 19.7952 31.5217C15.1336 25.5656 5.60445 30.0498 8.05298 19.9276C9.32613 14.7528 23.8482 11.7008 22.1807 36.53ZM8.0702 26.5325C9.08807 28.6434 15.4652 28.9892 17.6789 30.605C21.1905 33.1679 20.6864 36.5392 20.6864 36.5392H19.8582C18.2278 31.4475 13.6519 35.479 9.98674 34.1077C7.68566 33.2738 6.01497 29.6593 8.0702 26.5325ZM19.689 43.1313L20.032 40.3599L20.649 40.4066L20.3746 43.4572C20.0979 44.8011 18.1313 44.6214 17.8832 43.3408L18.2031 40.1736L18.9345 40.2904L18.6146 42.945C18.6552 43.8236 19.5201 43.7709 19.689 43.1313ZM16.4051 43.8881L15.7016 43.715C15.7841 43.1227 16.4736 41.9175 15.1108 41.9175L14.7315 43.4927L13.9553 43.3444L14.7799 39.5631C16.7955 39.7868 16.9718 40.3583 17.0118 40.9718C16.9322 41.4476 16.8078 41.7799 16.4054 41.8613C16.8764 42.2967 16.4109 43.2094 16.4051 43.8881ZM11.9371 39.6528C11.7432 39.9149 11.3551 40.8305 11.2989 41.5601C11.2391 42.3335 11.9682 42.1707 12.1498 42.0803C12.2963 42.0079 12.4051 41.3867 12.4051 41.3867L11.8945 41.2133L12.0647 40.6935L13.2138 41.0836L12.6607 43.0347L12.1927 42.9043L12.2352 42.6009C11.6623 42.8669 10.6136 42.6674 10.4905 41.994C10.3674 41.4529 10.7402 39.8126 11.3414 39.0462C11.9257 38.301 13.3492 39.0293 13.384 39.4797C13.4184 39.9284 13.2446 40.4334 13.2446 40.4334L12.7087 40.3305C12.7087 40.3305 12.7416 40.1683 12.7883 39.9129C12.8377 39.6422 12.1449 39.3712 11.9371 39.6528ZM22.3863 42.8282L22.2492 44.5052L21.678 44.4821L21.8835 40.4996C23.3103 40.5297 24.1281 40.7309 24.1008 41.7574C24.0157 43.1598 22.9011 42.8444 22.3863 42.8282ZM23.8085 36.5389H22.8527C22.7679 33.0902 23.4188 26.782 21.6403 22.1397C20.2928 18.6205 16.8825 17.0374 16.1268 14.1945C14.9303 9.69483 16.9667 4.82615 23.8085 4.45123C29.74 5.07169 31.5624 9.73719 30.5507 14.081C28.8112 18.4242 27.0713 17.8001 24.9053 22.1265C23.1362 26.7642 23.8098 32.84 23.8085 36.5389ZM34.4091 42.9215L33.7462 43.1545L33.5403 39.1488L34.3175 38.9393L36.2376 42.2461L35.7118 42.5956L35.0717 41.6644L34.3403 41.9437L34.4091 42.9215ZM26.6757 36.5389H25.9112C26.5413 27.6818 37.4653 29.606 38.4637 26.5325C40.1903 29.5795 39.5696 32.1487 37.7667 33.4658C33.2867 36.7398 28.9908 31.0428 26.6757 36.5389ZM30.7293 41.0122L31.0723 42.852C31.2857 43.2759 31.4305 43.1975 31.7579 43.1548C32.1376 42.8748 32.0583 42.6022 31.9866 42.2464L32.6494 42.1535C32.8222 43.4864 32.2003 43.6224 31.7352 43.7137C30.7378 43.7865 30.5423 43.5886 30.2724 42.2699C30.1152 41.1412 29.8436 39.9493 30.7751 39.7315C32.3042 39.4936 32.2139 40.1948 32.3523 40.6862L31.6894 40.803C31.5835 40.3808 31.4312 40.2133 31.095 40.2444C30.7888 40.3877 30.6631 40.6197 30.7293 41.0122ZM29.335 42.9215C29.3669 43.5016 29.1736 43.8868 28.8092 44.0162L27.2548 44.3421L26.6377 40.4996C26.9566 40.4466 28.5205 39.8629 28.9005 40.9192C29.0879 41.5641 28.8937 41.7954 28.6718 42.0833C29.0924 42.221 29.2344 42.5545 29.335 42.9215ZM25.3435 23.6384C28.8063 13.7045 36.73 15.4599 38.4874 19.9279C40.895 28.8932 33.1425 26.4346 28.1765 30.111C26.2996 31.7741 25.3119 33.6822 25.2973 36.5747H24.4464C24.3954 30.7486 24.3028 26.6232 25.3435 23.6384Z"
                        fill="#AFA9B1"
                      />
                    </svg>

                    <svg
                      width="216"
                      height="48"
                      viewBox="0 0 216 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-10"
                    >
                      <path
                        d="M12.8053 38.0199H17.396V47.8417H19.0067V38.0199H23.5973V36.7526H12.8054L12.8053 38.0199ZM29.6376 39.604C28.1879 39.604 26.9798 40.1585 26.1745 41.3466V36.7526H24.6443V47.8417H26.1745V44.198C26.1745 41.6634 27.7852 40.7129 29.3959 40.7129C30.8457 40.7129 31.8926 41.505 31.8926 43.4852V47.9208H33.4228V43.4059C33.4228 40.7921 31.8926 39.604 29.6376 39.604ZM37.2081 43.0099C37.4496 41.2673 38.5772 40.4752 40.188 40.4752C41.557 40.4752 42.9261 41.1881 43.0068 43.0099H37.2081ZM40.188 39.4456C37.2886 39.4456 35.5168 40.9505 35.5168 43.8812C35.5168 46.4159 37.2081 48 40.1074 48C42.1208 48 44.0537 47.2871 44.3758 45.307H42.6846C42.3624 46.4159 41.396 46.8911 40.0268 46.8911C38.1745 46.8911 37.208 45.703 37.047 44.1188H44.5369V43.6436C44.6175 40.9505 43.0873 39.4456 40.188 39.4456ZM101.799 41.1881L101.718 39.604H100.188C100.268 40.2377 100.268 40.7921 100.268 41.4257V47.5248H101.799V43.7229C101.799 41.7426 102.685 40.7922 104.617 40.7922C104.94 40.7922 105.262 40.7922 105.826 40.9506V39.5249C105.584 39.5249 105.423 39.4456 104.859 39.4456C103.409 39.4456 102.443 40.2377 101.799 41.1881ZM149.235 41.1882L149.154 39.6041H147.624C147.705 40.2377 147.705 40.7922 147.705 41.4258V47.5249H149.315V43.7229C149.315 41.7426 150.201 40.7922 152.134 40.7922C152.456 40.7922 152.779 40.7922 153.342 40.9506V39.5249C153.101 39.5249 152.94 39.4456 152.376 39.4456C150.846 39.4456 149.799 40.2377 149.235 41.1882ZM83.9195 46.2575L81.1007 39.4456H79.0872L76.349 46.2575L73.7718 39.4456H72L75.2215 47.3664H77.3155L79.9731 40.6337L82.7919 47.3664H84.8053L87.9463 39.4456H86.3356L83.9195 46.2575ZM55.9732 42.3763H52.6712V37.9407H55.8926C58.0671 37.9407 58.792 38.7328 58.792 40.0001C58.792 41.5842 58.0671 42.3763 55.9732 42.3763ZM55.8926 36.7526H51.0604V47.8417H52.6712V43.6436H56.1342C59.1141 43.6436 60.5637 42.1386 60.5637 40.0792C60.5637 38.1782 59.3557 36.7526 55.8926 36.7526ZM66.0403 46.8911C63.8658 46.8911 62.7383 45.4654 62.7383 43.7228C62.7383 41.8218 63.8658 40.5545 66.0403 40.5545C68.2953 40.5545 69.4228 41.901 69.4228 43.7228C69.4228 45.4654 68.2953 46.8911 66.0403 46.8911ZM66.0403 39.4456C62.8188 39.4456 61.047 41.1881 61.047 43.7228C61.047 46.4159 62.8188 48 66.0403 48C69.3423 48 71.0335 46.4951 71.0335 43.7228C71.1141 41.0297 69.4228 39.4456 66.0403 39.4456ZM91.0067 43.0099C91.2483 41.2673 92.3758 40.4752 93.9866 40.4752C95.3557 40.4752 96.7248 41.1881 96.7248 43.0099H91.0067ZM93.9866 39.4456C91.0873 39.4456 89.3154 40.9505 89.3154 43.8812C89.3154 46.4159 91.0067 48 93.9061 48C95.9195 48 97.8524 47.2871 98.1745 45.307H96.5637C96.2416 46.4159 95.2751 46.8911 93.9061 46.8911C92.0537 46.8911 91.0873 45.703 90.9262 44.1188H98.4161V43.6436C98.4161 40.9505 96.8053 39.4456 93.9866 39.4456ZM156.564 43.0099C156.805 41.2673 157.933 40.4752 159.544 40.4752C160.913 40.4752 162.282 41.1881 162.282 43.0099H156.564ZM159.624 39.4456C156.725 39.4456 154.953 40.9505 154.953 43.8812C154.953 46.4159 156.644 48 159.544 48C161.557 48 163.49 47.2871 163.812 45.307H162.201C161.879 46.4159 160.913 46.8911 159.544 46.8911C157.691 46.8911 156.725 45.703 156.564 44.1188H164.054V43.6436C163.973 40.9505 162.443 39.4456 159.624 39.4456ZM123.221 38.8911V39.2079H121.208V40.3168H123.221V47.208H124.832V40.3168H128.054V39.2079H124.832V38.5743C124.832 37.307 125.396 36.9109 126.604 36.9109C127.007 36.9109 127.57 36.9901 128.295 37.1485V36.0396C127.732 35.9604 127.087 35.8812 126.282 35.8812C123.946 35.802 123.221 37.0693 123.221 38.8911ZM115.329 46.8911C113.154 46.8911 111.946 45.4654 111.946 43.7228C111.946 41.8218 113.154 40.5545 115.329 40.5545C117.584 40.5545 118.711 41.901 118.711 43.7228C118.711 45.4654 117.503 46.8911 115.329 46.8911ZM115.329 39.4456C112.107 39.4456 110.336 41.1881 110.336 43.7228C110.336 46.4159 112.107 48 115.329 48C118.55 48 120.322 46.4951 120.322 43.7228C120.322 41.0297 118.631 39.4456 115.329 39.4456ZM187.409 39.4456C185.718 39.4456 184.671 40.5545 184.268 41.4257C183.785 40.0792 182.577 39.4456 181.369 39.4456C180.242 39.4456 179.114 40 178.389 41.1881L178.309 39.7624H176.859C176.94 40.3961 176.94 40.9505 176.94 41.5841V47.6832H178.55V43.8812C178.55 41.505 179.919 40.5545 181.128 40.5545C182.416 40.5545 183.06 41.4257 183.06 43.6436V47.6832H184.591V43.8812C184.591 41.1089 186.362 40.5545 187.168 40.5545C188.778 40.5545 189.181 41.5841 189.181 43.7228V47.6832H190.792V43.0891C190.711 40.4752 189.342 39.4456 187.409 39.4456ZM198.685 43.3268L196.027 42.7723C194.819 42.5347 194.336 42.297 194.336 41.6634C194.336 40.8713 195.302 40.4752 196.671 40.4752C197.799 40.4752 198.846 40.7921 198.926 41.7426H200.537C200.537 39.8416 198.443 39.3663 196.671 39.3663C194.577 39.3663 192.725 40.0792 192.725 41.8218C192.725 43.0891 193.691 43.5644 194.899 43.8812L197.396 44.4357C198.282 44.5941 199.168 44.8317 199.168 45.5446C199.168 46.4159 198.282 46.8911 196.51 46.8911C195.06 46.8911 194.094 46.4951 193.933 45.3862H192.242C192.403 47.208 194.094 47.9208 196.349 47.9208C199.409 47.9208 200.779 47.0496 200.779 45.3862C200.859 44.198 200.134 43.6436 198.685 43.3268ZM139.49 46.6535H136.51V37.9407H139.248C143.275 37.9407 144.242 39.4456 144.242 42.2971C144.242 44.5942 143.356 46.6535 139.49 46.6535ZM139.651 36.7526H134.899V47.8417H139.732C143.678 47.8417 145.933 45.8615 145.933 42.2972C145.933 38.7328 144 36.7526 139.651 36.7526ZM172.752 44.1189C172.752 46.0199 171.624 46.8912 169.691 46.8912C168.161 46.8912 167.517 46.2575 167.517 45.3863C167.517 43.6436 170.658 43.8021 171.866 43.8021H172.671V44.1189H172.752ZM174.282 42.2179C174.282 40.3169 172.671 39.4456 170.416 39.4456C168.644 39.4456 166.631 39.9208 166.47 41.8219H168.161C168.242 41.0298 169.047 40.4753 170.497 40.4753C171.866 40.4753 172.832 40.9506 172.832 42.3763V42.6931H171.946C170.094 42.6931 165.987 42.5347 165.987 45.307C165.987 46.8912 167.356 47.9209 169.369 47.9209C170.98 47.9209 171.946 47.7625 172.832 46.5743L172.913 47.6833H174.362C174.282 47.208 174.282 46.7327 174.282 46.1783V42.2179Z"
                        fill="#AFA9B1"
                      />
                      <path
                        d="M24.8859 4.11885L28.1879 4.51483C29.6376 4.67331 29.7986 5.86139 29.7986 6.65349V10.4555H14.7383V6.65349C14.7383 5.86139 14.8993 4.67331 16.349 4.51483L19.651 4.11885V0.871267H0V4.11885L3.30199 4.51483C4.75164 4.67331 4.91278 5.86139 4.91278 6.65349V19.1684C4.91278 19.9604 4.75171 21.1486 3.30199 21.3069L0 21.7823V25.0299H19.5705V21.7823L16.2685 21.3862C14.8188 21.2278 14.6577 20.0397 14.6577 19.2477V15.4455H29.7181V19.2475C29.7181 20.0396 29.5571 21.2277 28.1074 21.3861L24.8054 21.7821V25.0297H44.3758V21.7821L41.0738 21.3861C39.6242 21.2277 39.4631 20.0396 39.4631 19.2476V6.65349C39.4631 5.86139 39.6242 4.67331 41.0738 4.51483L44.3758 4.11885V0.871267H24.8054V4.11885H24.8859ZM153.987 20.4356H145.772V5.54458H153.987C158.819 5.54458 160.43 7.84158 160.43 12.9901C160.43 18.1386 158.819 20.4356 153.987 20.4356ZM155.758 0.871267H131.597V4.11885L134.497 4.43566C135.544 4.59407 136.188 4.99012 136.188 6.41585V19.2476C136.188 20.0397 136.027 21.2277 134.577 21.3861L131.275 21.7822V25.0298H155.758C164.537 25.0298 171.705 21.5446 171.705 12.9109C171.705 4.35642 164.456 0.871267 155.758 0.871267Z"
                        fill="#AFA9B1"
                      />
                      <path
                        d="M185.154 13.3862L189.825 5.94063L194.738 13.3862H185.154ZM212.617 21.4654C211.087 21.307 210.604 20.2772 210.121 19.5644L198.846 2.53465C198.04 1.34656 197.477 0.95051 196.269 0.95051H177.745V4.19802L182.175 4.67331C182.819 4.75248 183.624 5.54458 182.98 6.73267L174.685 20.1188C174.362 20.6733 173.96 21.307 172.993 21.3862L169.691 21.7822V25.0298H185.316V21.7822L182.658 21.5446C181.53 21.3862 180.886 20.5941 181.45 19.7228L182.738 17.7426H197.718L198.846 19.406C199.812 20.9109 198.604 21.4654 197.557 21.6238L194.819 21.9406V25.1882H216V21.7822L212.617 21.4654ZM113.879 4.11885L117.181 4.51483C118.631 4.67331 118.792 5.86139 118.792 6.6535V18.7723L105.825 1.90102C105.262 1.10892 104.779 0.871271 103.329 0.871271H86.5772V4.11885L89.8792 4.51483C91.3288 4.67331 91.49 5.86139 91.49 6.6535V19.1684C91.49 19.9604 91.3288 21.1486 89.8792 21.3069L86.5772 21.703V24.9505H102.201V21.7822L98.8993 21.3862C97.4497 21.2277 97.2886 20.0397 97.2886 19.2476V7.12865L110.255 24C110.819 24.7921 111.383 25.0297 112.752 25.0297H124.591V6.6535C124.591 5.86139 124.752 4.67331 126.201 4.51483L129.503 4.11885V0.871271H113.879V4.11885ZM65.5571 21.2277C59.3557 21.2277 56.8591 18.6931 56.8591 12.9109C56.8591 7.12872 59.4362 4.594 65.5571 4.594C71.7584 4.594 74.255 7.12872 74.255 12.9109C74.3355 18.6139 71.7584 21.2277 65.5571 21.2277ZM65.557 0C49.6913 0 45.5839 6.89107 45.5839 12.9109C45.5839 18.9307 49.6913 25.8218 65.5571 25.8218C81.4228 25.8218 85.5302 18.9307 85.5302 12.9109C85.6108 6.89107 81.5034 0 65.557 0Z"
                        fill="#AFA9B1"
                      />
                    </svg>

                    <svg
                      width="221"
                      height="48"
                      viewBox="0 0 221 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-10"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M118.152 33.7479C115.75 36.2086 112.877 37.4454 109.547 37.4454C106.855 37.4454 104.566 36.8911 102.231 35.5212V29.8804C104.109 31.1667 106.47 32.3918 108.798 32.3918C113.655 32.3918 116.546 29.0168 116.546 24.234C116.546 19.4472 113.556 15.972 108.697 15.972C106.526 15.972 104.767 16.7597 103.393 18.3386C101.92 20.0489 101.159 22.4936 101.159 25.7259V48H100.793C98.1157 48 95.9466 45.81 95.9466 43.1074V24.8897C95.9466 17.1592 100.627 10.9172 108.673 10.9172C112.645 10.9172 115.872 12.2889 118.318 15.0444C120.618 17.6188 121.758 20.8807 121.758 24.8061C121.758 28.2993 120.555 31.2854 118.152 33.7479ZM174.585 33.559C172.193 36.1524 169.114 37.4454 165.381 37.4454C161.441 37.4454 158.23 36.0738 155.787 33.3189C153.488 30.7127 152.347 27.448 152.347 23.5582C152.347 16.6723 157.612 10.9172 164.539 10.9172C167.211 10.9172 169.531 11.4872 171.874 12.7847V18.4845C169.996 17.1976 167.636 15.9725 165.308 15.9725C160.451 15.9725 157.559 19.347 157.559 24.1315C157.559 28.8508 160.619 32.3924 165.407 32.3924C167.575 32.3924 169.361 31.5718 170.79 29.9188C172.209 28.277 172.947 25.8641 172.947 22.6228V4.89259C172.947 2.18947 175.117 0 177.793 0H178.159V23.454C178.159 27.5845 176.975 30.9656 174.585 33.559ZM189.304 8.41412C188.757 9.03252 187.973 9.31721 187.016 9.31721C185.226 9.31721 183.947 7.98514 183.947 6.19234C183.947 4.35776 185.203 3.11929 187.016 3.11929C188.761 3.11929 190.085 4.42517 190.085 6.19234C190.085 7.06702 189.831 7.81634 189.304 8.41412ZM215.787 22.6222C215.787 20.5475 215.009 18.9052 213.448 17.6611C212.041 16.5413 210.284 15.972 208.146 15.972C203.428 15.972 200.399 19.6952 200.399 24.2864C200.399 28.7043 203.61 32.3918 208.096 32.3918C211.216 32.3918 212.885 30.5517 214.664 28.2591V34.8688C213.758 35.5546 212.715 36.3022 211.651 36.7412C210.527 37.2148 209.186 37.4454 207.637 37.4454C200.134 37.4454 195.187 31.1723 195.187 23.9226C195.187 20.1999 196.333 17.1224 198.638 14.7223C201.085 12.1791 204.294 10.9172 208.222 10.9172C215.671 10.9172 221 15.2354 221 23.0379V36.9256H220.635C217.957 36.9256 215.787 34.7351 215.787 32.0319V22.6222ZM144.437 21.1314C143.778 19.0751 142.952 18.0628 141.053 16.992C136.536 14.4443 132.091 16.6132 130.023 21.1119L144.437 21.1314ZM140.459 37.368C137.13 38.0822 133.864 37.5312 130.677 35.7329C127.567 33.9802 125.485 31.3734 124.442 27.9288C122.332 20.962 126.654 13.1986 133.606 11.3189C137.051 10.3874 140.355 10.8092 143.494 12.5797C148.708 15.5224 150.608 20.0734 150.276 25.9376L129.277 25.8953C129.587 28.287 131.055 30.1584 133.12 31.3222C135.213 32.5033 137.137 32.7852 138.921 32.2264C140.905 31.5979 142.512 29.9645 143.82 28.4436L148.1 31.5918C146.354 34.7451 143.978 36.6114 140.459 37.368ZM184.41 11.4381H189.621V36.9251H189.255C186.58 36.9251 184.41 34.7345 184.41 32.0314L184.41 11.4381ZM7.62781 36.9251C2.5299 36.9251 0 33.4247 0 28.5349V9.98853C0 7.28652 2.17022 5.09538 4.84708 5.09538H5.21284V11.4387H14.0191V16.4929H5.21229V29.1216C5.21229 31.2692 6.16203 31.872 8.19413 31.872H14.0191V36.9262L7.62781 36.9251ZM37.8976 33.7033C35.323 36.1958 32.2279 37.4449 28.6322 37.4449C25.0702 37.4449 21.9928 36.1947 19.4182 33.7033C16.8347 31.2018 15.5468 28.0179 15.5468 24.1816C15.5468 16.6962 21.2077 10.9178 28.6322 10.9178C32.1958 10.9178 35.2815 12.1769 37.8722 14.6867C40.4717 17.2037 41.7707 20.3782 41.7707 24.1816C41.7707 28.0179 40.4811 31.2013 37.8976 33.7033ZM62.2667 17.5709C61.5021 18.8656 60.9093 19.7938 60.4921 20.3548C60.0324 20.9648 59.5783 21.4523 59.1285 21.7888C62.7507 22.9699 64.0999 25.5037 64.0999 29.2781V36.9251H63.7342C61.0573 36.9251 58.8871 34.7345 58.8871 32.0314V29.7968C58.8871 27.3527 57.8014 25.6947 55.2367 25.6947H50.5035V36.9251H50.1372C47.4609 36.9251 45.2923 34.7345 45.2923 32.0314V4.89259C45.2923 2.18947 47.4609 0 50.1377 0H50.5035V20.5893H52.0438C53.7367 20.5893 54.8489 20.0044 55.4876 18.8985L59.8656 11.4393L65.805 11.4337L62.2667 17.5709ZM89.1724 33.7038C86.5966 36.1964 83.5015 37.4454 79.9064 37.4454C76.345 37.4454 73.2676 36.1953 70.6918 33.7038C68.1083 31.2024 66.8205 28.0185 66.8205 24.1822C66.8205 16.6968 72.4819 10.9184 79.9064 10.9184C83.47 10.9184 86.5552 12.1774 89.1464 14.6872C91.7465 17.2043 93.0443 20.3787 93.0443 24.1822C93.0443 28.0185 91.7559 31.2018 89.1724 33.7038ZM85.4099 18.2506C83.9734 16.7335 82.149 15.972 79.9064 15.972C75.1102 15.972 72.2383 19.5024 72.2383 24.1822C72.2383 28.7968 75.1781 32.3918 79.9064 32.3918C84.6358 32.3918 87.5746 28.7968 87.5746 24.1822C87.5746 21.732 86.8453 19.7659 85.4104 18.2506H85.4099ZM34.1362 18.2506C32.6997 16.7335 30.8754 15.972 28.6333 15.972C23.8365 15.972 20.9652 19.5024 20.9652 24.1822C20.9652 28.7968 23.9045 32.3918 28.6328 32.3918C33.3622 32.3918 36.3004 28.7968 36.3004 24.1822C36.3004 21.732 35.5722 19.7659 34.1362 18.2506Z"
                        fill="#AFA9B1"
                      />
                    </svg>
                  </Box>
                </Box>
              </Box>
            </Container>
            <Box className="overflow-hidden">
              <Box
                className="hidden md:block md:absolute overflow-hidden top-0"
                sx={{
                  width: { xl: "548px", md: "438px" },
                  height: { xl: "592px", md: "473px" },
                  left: {
                    md: "calc(100vw - 438px)",
                    xl: "calc(100vw - 548px)",
                  },
                  background: "rgba(113, 63, 151, 0.42)",
                  borderRadius: "0px 0px 0px 50px",
                }}
              />
              <Box
                className="hidden md:block md:absolute overflow-hidden top-0"
                sx={{
                  width: { xl: "274px", md: "219px" },
                  height: { xl: "319px", md: "255px" },
                  left: {
                    md: "calc(100vw - 219px)",
                    xl: "calc(100vw - 274px)",
                  },
                  background: "#9D28B1",
                  borderRadius: "0px 0px 0px 50px",
                }}
              />
              <Box
                className="hidden md:block md:absolute overflow-hidden "
                sx={{
                  width: { xl: "627px", md: "calc(0.33 * 100vw)" },
                  height: {
                    xl: "413px",
                    md: "min(calc(0.38 * 100vh), calc(0.21 * 100vw))",
                  },
                  left: "calc(100vw * (1 - 0.40))",
                  top: "calc(0.1536 * 100vw)",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15);",
                }}
              >
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
                  className="py-0"
                  sx={{
                    width: { xl: "627px", md: "calc(0.33 * 100vw)" },
                    height: {
                      xl: "413px",
                      md: "min(calc(0.38 * 100vh), calc(0.21 * 100vw))",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            className="h-min-screen flex flex-col items-center justify-between py-10 md:py-20"
            sx={{ backgroundColor: "#F8F4F9" }}
          >
            {/* <Trans t={t} i18nKey={'section2.header'}> */}
            <Box className="max-w-xl xl:max-w-full pb-10 md:pb-20 px-4">
              <Typography
                className="text-center"
                variant="h4"
                color="#713F97"
                fontWeight="bold"
              >
                {t("section2.header")}
              </Typography>
            </Box>
            {/* </Trans> */}
            <Box className="flex flex-col md:flex-row items-top md:justify-around flex-wrap">
              <Box className="flex flex-col items-center justify-center px-10 lg:w-72 pb-10 basis-1/2 lg:basis-1/4">
                <RoundedImage src={"/assets/ide.png"} alt="Rounded Image" />
                <Typography
                  variant="h5"
                  color="text.primary"
                  className="pt-3"
                  fontWeight="bold"
                >
                  {t("section2.content.step1.header")}
                </Typography>
                <Typography variant="body1" color="text.primary" align="center">
                  {t("section2.content.step1.content")}
                </Typography>
              </Box>
              <Box className="flex flex-col items-center justify-center px-10 lg:w-72 pb-10 basis-1/2 lg:basis-1/4">
                <RoundedImage src={"/assets/cari.png"} alt="Rounded Image" />
                <Typography
                  variant="h5"
                  color="text.primary"
                  className="pt-3"
                  fontWeight="bold"
                >
                  {t("section2.content.step2.header")}
                </Typography>
                <Typography variant="body1" color="text.primary" align="center">
                  {t("section2.content.step2.content")}
                </Typography>
              </Box>
              <Box className="flex flex-col items-center justify-center px-10 lg:w-72 pb-10 basis-1/2 lg:basis-1/4">
                <RoundedImage src={"/assets/proses.png"} alt="Rounded Image" />
                <Typography
                  variant="h5"
                  color="text.primary"
                  className="pt-3"
                  fontWeight="bold"
                >
                  {t("section2.content.step3.header")}
                </Typography>
                <Typography variant="body1" color="text.primary" align="center">
                  {t("section2.content.step3.content")}
                </Typography>
              </Box>
              <Box className="flex flex-col items-center justify-center px-10 lg:w-72 pb-10 basis-1/2 lg:basis-1/4">
                <RoundedImage src={"/assets/kirim.png"} alt="Rounded Image" />
                <Typography
                  variant="h5"
                  color="text.primary"
                  className="pt-3"
                  fontWeight="bold"
                >
                  {t("section2.content.step4.header")}
                </Typography>
                <Typography variant="body1" color="text.primary" align="center">
                  {t("section2.content.step4.content")}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            maxWidth="lg"
            className="flex flex-col px-4 mx-auto py-10 md:py-20"
          >
            <Box className="flex flex-col md:flex-row justify-between">
              <Typography
                className="px-10 md:px-0"
                variant="h4"
                color="#713F97"
              >
                {t("sectionJelajah.header")}
              </Typography>
              <Button variant="text" className="max-w-fit ml-10" onClick={() => router.push('/product-list')}>
                {t("sectionJelajah.viewAllButton")}
              </Button>
            </Box>
            <Divider className="mx-10 md:mx-0 pt-6" />
            <Grid
              className="px-10 md:px-0 pt-8 md:pt-12"
              container
              spacing={{
                xs: 2,
                sm: 4,
              }}
            >
              {<ProductList productList={productList} />}
            </Grid>
            <Box className="flex flex-col md:flex-row pt-20 justify-between">
              <Typography
                className="px-10 md:px-0"
                variant="h4"
                color="#713F97"
              >
                {t("sectionJelajah.categoryHeader")}
              </Typography>
            </Box>
            <Divider className="mx-10 md:mx-0 pt-6" />
            <Grid
              className="px-10 md:px-0 pt-8 md:pt-12"
              container
              spacing={{
                xs: 2,
                sm: 4,
              }}
            >
              {categories.map((category: any) => (
                <Grid key={category.id} item xs={12} sm={6} md={4} lg={3}>
                  <CardCategories
                    key={category.id}
                    imageUrl={category.image}
                    categoryName={category.name}
                    description={category.description}
                    slug={category.slug}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box className="py-10 md:py-20 px-4" sx={{ backgroundColor: "#F8F4F9" }}>
            <Grid
              container
              spacing={{
                xs: 2,
                sm: 4,
                md: 5,
              }}
              className="max-w-6xl px-4 md:px-6 mx-auto"
            >
              <Grid item md={6} sx={{p: 4}}>
                <img
                  className="w-full"
                  src={"https://images.pexels.com/photos/6790033/pexels-photo-6790033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                  alt="Invitation for Craftsmen"
                />
              </Grid>
              <Grid item md={6} alignItems={'center'} display={'flex'}>
                <Box className="max-w-sm" flexGrow={1}>
                  <Typography
                    variant="h4"
                    color="#713F97"
                    fontWeight="bold"
                    className="pb-5 pt-4"
                  >
                    {t("section3.header")}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {t("section3.content")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="flex flex-col md:flex-row items-center justify-between py-10 md:py-20 px-4 max-w-6xl mx-auto bg-white gap-4">
            <Box className="max-w-sm pb-8 pr-12">
              <Typography
                variant="h4"
                color="#713F97"
                fontWeight="bold"
                className="pb-5"
              >
                {t("section4.header")}
              </Typography>
              <Typography variant="body1" color="text.primary">
                {t("section4.content")}
              </Typography>
            </Box>
            <img
              className="pb-8"
              src="/daily_social_logo.png"
              alt="Daily Social Logo"
            />
            <img
              src="/startup4industries_logo.png"
              alt="Startup 4 Industries Logo"
            />
          </Box>
          {/* <Box
            className="flex flex-col items-center justify-around py-10 md:py-20 px-4"
            sx={{ backgroundColor: "#F8F4F9" }}
          >
            <Box className=" max-w-4xl mx-auto text-center">
              <Typography
                variant="h4"
                color="#713F97"
                className="pb-4 md:pb-20"
                fontWeight="bold"
              >
                {t("section5.header")}
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                className="pb-8 md:pb-20"
              >
                {t("section5.content")}
              </Typography>
              <Box className="flex justify-between md:relative rounded-4 bg-white hover:bg-opacity-80 w-full sm:w-auto">
                <StyledInputBase
                  placeholder={t("section5.email") ?? undefined}
                  inputProps={{ "aria-label": "search" }}
                  onSubmit={(e) => {}}
                />
                <Button variant="contained" color="primary" className="md:ml-5">
                  {t("section5.register")}
                </Button>
              </Box>
            </Box>
          </Box> */}
          {/* <GarapinFooter/> */}
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
