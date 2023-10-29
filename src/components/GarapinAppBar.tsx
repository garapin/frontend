import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Avatar,
  Badge,
  ClickAwayListener,
  FormControl,
  IconButton,
  MenuItem,
  NativeSelect,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import Link from "next/link";
import IsAdmin from "./Admin/CheckIsAdmin";
import Image from "next/image";
import { HamburgerIconSVG } from "@/assets/icons/hamburger-icon";
import CloseIcon from "@mui/icons-material/Close";
import { TransactionIconSVG } from "@/assets/icons/transaction-icon";
import { CartIconSVG } from "@/assets/icons/cart-icon";
import { BagIconSVG } from "@/assets/icons/bag-icon";
import { WhatsApp } from "@mui/icons-material";
import { useAppSelector } from "@/hooks/useAppRedux";

const LanguageSelector = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  paddingLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
}));

const GarapinAppBar = ({
  searchVariant = false,
  onSearchSubmit,
}: {
  searchVariant?: boolean;
  onSearchSubmit?: FormEventHandler<HTMLDivElement>;
}) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const { cartCount } = useAppSelector((state) => state.product);
  const auth: any = useFirebaseAuth();
  const { search } = router.query;
  const fieldRef = useRef<HTMLInputElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const secondNavbarRoutes = ["/transaction-list", "/address"];
  const secondNavbar = secondNavbarRoutes.includes(router.pathname);
  const [value, setValue] = React.useState(
    secondNavbarRoutes.indexOf(router.pathname)
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {}, [auth]);

  const handleClick = (event: any) => {
    // setAnchorEl(event.currentTarget);
    setOpenMenu(!openMenu);
  };

  const handleLogOut = async () => {
    localStorage.setItem("redirect", router.asPath);
    await auth.signOut();
    setOpenMenu(false);
  };

  const switchToLocale = useCallback(
    (locale: string) => {
      const path = router.asPath;

      return router.push(path, path, { locale });
    },
    [router]
  );

  useEffect(() => {
    if (search !== undefined && fieldRef.current !== null) {
      fieldRef.current.value = search as string;
    }
  }, [search]);

  const menus = [
    {
      label: t("appBar.menu.home"),
      link: "/",
    },
    {
      label: t("appBar.menu.about_us"),
      link: "#footer",
    },
    {
      label: t("appBar.menu.product"),
      link: "/product-list",
    },
    {
      label: t("appBar.menu.our_contact"),
      link: "#footer",
    },
  ];
  return (
    <Box className="pt-6 bg-white relative shadow-sm">
      <div className="max-w-screen-2xl mx-auto lg:relative">
        <div className="flex items-center justify-between shadow-sm lg:shadow-none pb-6 px-4">
          <Link href="/">
            <Image
              src="/heipack.png"
              alt="login-bg"
              width={300}
              height={100}
              className="w-[170px] h-[38px]"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-4 justify-between min-w-[435px]">
            {menus.map((menu, index) => (
              <Link href={menu.link} key={index}>
                <Typography
                  variant="body1"
                  className="cursor-pointer hover:text-[#713F97]"
                >
                  {menu.label}
                </Typography>
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Box className="hidden items-center md:flex">
              <LanguageSelector>
                <Box>
                  <FormControl fullWidth>
                    <NativeSelect
                      disableUnderline={true}
                      value={i18n.resolvedLanguage}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => switchToLocale(e.target.value as string)}
                    >
                      <option
                        value={"id"}
                        disabled={i18n.resolvedLanguage === "id"}
                      >
                        ID
                      </option>
                      <option
                        value={"en"}
                        disabled={i18n.resolvedLanguage === "en"}
                      >
                        EN
                      </option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </LanguageSelector>
              <IconButton
                aria-label="cart"
                onClick={() => router.push("/cart")}
              >
                {/* <Badge badgeContent={cartCount} color="primary"> */}
                <CartIconSVG width={24} height={24} />
                {/* </Badge> */}
              </IconButton>
            </Box>
            <Button
              variant="contained"
              className="capitalize py-3"
              startIcon={<WhatsApp />}
              onClick={() => {
                window.open("https://wa.me/+6281380206100", "_blank");
              }}
            >
              {t("free_consultation.header")}
            </Button>
            <IconButton
              className="hidden lg:block"
              aria-label="menu"
              size="small"
              onClick={handleClick}
            >
              <HamburgerIconSVG />
            </IconButton>
          </div>
          <IconButton
            className="lg:hidden"
            aria-label="menu"
            size="small"
            onClick={handleClick}
          >
            <HamburgerIconSVG />
          </IconButton>
        </div>
        {secondNavbar && (
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            className="md:hidden"
            scrollButtons={false}
          >
            <Tab
              className="py-6"
              onClick={() => router.push("/transaction-list")}
              label="Daftar Transaksi"
            />
            {/* <Tab
            className="py-6"
            onClick={() => router.push("/address")}
            label="Alamat"
          />
          <Tab
            className="py-6"
            onClick={() => router.push("/customer-support")}
            label="Layanan Pelanggan"
          />
          <Tab
            className="py-6"
            onClick={() => router.push("/profile")}
            label="Profil Saya"
          /> */}
          </Tabs>
        )}
        {openMenu && (
          <ClickAwayListener onClickAway={handleClick}>
            <Box className="absolute top-0 left-0 h-screen w-full bg-white shadow-md z-50 py-6 lg:right-0 lg:w-96 lg:ml-auto lg:top-12 lg:h-fit">
              <div className="flex items-center justify-between shadow-sm px-4 pb-6">
                <Link href="/">
                  <Image
                    src="/heipack.png"
                    alt="login-bg"
                    width={300}
                    height={100}
                    className="w-[170px] h-[38px]"
                  />
                </Link>
                <IconButton
                  aria-label="menu"
                  size="small"
                  onClick={() => setOpenMenu(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="p-4">
                {!auth.loading &&
                  auth.authUser == null &&
                  router.pathname !== "/login" && (
                    <Link
                      href="/login"
                      style={{ paddingTop: "4px", paddingBottom: "4px" }}
                    >
                      <Button variant="contained" fullWidth>
                        {t("appBar.loginButton")}
                      </Button>{" "}
                    </Link>
                  )}
                {!auth.loading && auth.authUser !== null && (
                  <Box className="space-y-4">
                    <div className="flex gap-4 text-black items-center">
                      <Avatar sx={{ ml: 2 }} className="w-16 h-16" />
                      <Typography
                        className="text-base font-semibold"
                        variant="body1"
                      >
                        {auth.authUser.displayName ?? auth.authUser.email}
                      </Typography>
                    </div>
                    <IsAdmin>
                      <MenuItem
                        className="py-4 rounded-lg hover:bg-[#713F97] hover:text-white"
                        onClick={() => {
                          router.push("/admin/orders");
                          setOpenMenu(false);
                        }}
                      >
                        <Box>Manage Orders</Box>
                      </MenuItem>
                    </IsAdmin>
                    <MenuItem
                      className="py-4 rounded-lg group hover:bg-[#713F97] hover:text-white"
                      onClick={() => {
                        router.push("/transaction-list");
                        setOpenMenu(false);
                      }}
                    >
                      <Box className="flex items-center gap-4">
                        <TransactionIconSVG className="fill-[#8692A6] group-hover:fill-[#fff]" />
                        {t("appBar.menu.totalTransaction")}
                      </Box>
                    </MenuItem>
                    <MenuItem
                      className="py-4 rounded-lg group hover:bg-[#713F97] hover:text-white"
                      onClick={() => {
                        router.push("/cart");
                        setOpenMenu(false);
                      }}
                    >
                      <Box className="flex items-center gap-4">
                        <CartIconSVG />
                        {t("appBar.menu.totalShop")}
                      </Box>
                    </MenuItem>
                    {/* <MenuItem className="py-4 rounded-lg group hover:bg-[#713F97] hover:text-white">
                    <Link href="#" className="flex items-center gap-4">
                      <BagIconSVG className="stroke-green-700" />
                      {t("appBar.menu.shopPoint")}
                    </Link>
                  </MenuItem> */}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleLogOut}
                      className="py-4 rounded-lg capitalize text-base font-bold"
                      fullWidth
                    >
                      {t("appBar.menu.logout")}
                    </Button>
                  </Box>
                )}
              </div>
            </Box>
          </ClickAwayListener>
        )}
      </div>
    </Box>
  );
};

export default withTranslation("common")(GarapinAppBar);
