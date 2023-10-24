import { Avatar, Box, Button, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import IsAdmin from "./Admin/CheckIsAdmin";
import { TransactionIconSVG } from "@/assets/icons/transaction-icon";
import { CartIconSVG } from "@/assets/icons/cart-icon";
import { useTranslation } from "react-i18next";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { useRouter } from "next/router";

const SidebarProfile = () => {
  const auth: any = useFirebaseAuth();
  const router = useRouter();
  const pathname = router.pathname;
  const [openMenu, setOpenMenu] = React.useState(false);
  const { t } = useTranslation(["common", "landing"]);
  const handleLogOut = async () => {
    localStorage.setItem("redirect", router.asPath);
    await auth.signOut();
    setOpenMenu(false);
  };
  return (
    <Box className="w-full">
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
            <div className="text-black text-center flex flex-col justify-center items-center">
              <Avatar sx={{ ml: 2 }} className="w-40 h-40 mb-4" />
              <Typography className="text-base font-semibold" variant="body1">
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
              className={`py-4 rounded-lg group hover:bg-[#713F97] hover:text-white ${
                pathname.includes("/transaction-list") &&
                "bg-[#713F97] text-white"
              }`}
              onClick={() => {
                router.push("/transaction-list");
                setOpenMenu(false);
              }}
            >
              <Box className="flex items-center gap-4">
                <TransactionIconSVG
                  className={`fill-[#8692A6] group-hover:fill-[#fff]
                ${
                  pathname.includes("/transaction-list") &&
                  "fill-[#fff] group-hover:fill-[#fff]"
                }
                `}
                />
                {t("appBar.menu.totalTransaction")}
              </Box>
            </MenuItem>
            <MenuItem
              className={`py-4 rounded-lg group hover:bg-[#713F97] hover:text-white  ${
                pathname.includes("/cart") && "bg-[#713F97] text-white"
              }`}
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
  );
};

export default SidebarProfile;
