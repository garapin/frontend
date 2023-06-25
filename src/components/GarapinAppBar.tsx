import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Container,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  NativeSelect,
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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  menuAppBar: {
    " & .MuiMenu-paper": {
      width: "160px",
      padding: "10px",

      "& .MuiMenu-list": {
        padding: "0px",

        "& .MuiMenuItem-root": {
          borderRadius: "5px",
          padding: "5px 10px",
        },
      },
    },
  },
});
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#713F97",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "70ch",
      "&:focus": {
        width: "80ch",
      },
    },
  },
}));

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
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];
  const auth = useFirebaseAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const { search } = router.query;
  const fieldRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  console.log('auth', auth)

  useEffect(() => {}, [auth]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    setAnchorEl(null);
    await auth.signOut();
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

  const handleSubmit = () => {
    router.push(
      `/search${
        fieldRef?.current?.value !== undefined
          ? `?q=${fieldRef?.current?.value}`
          : ""
      }`
    );
  };

  const { t } = useTranslation("common");
  return (
    <Container maxWidth="xl">
      <AppBar position="fixed" style={{ zIndex: 1300 }}>
        <Toolbar>
          <Box className={`flex flex-row justify-between w-full`}>
            <Box className="flex flex-row items-center">
              <Box
                className="mr-3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  flexShrink: 1,
                }}
              >
                <Link href="/" className="hidden md:block">
                  <img
                    src="/garapin_logo_white.svg"
                    alt="Garapin Logo"
                    style={{ maxHeight: "40px" }}
                  />
                </Link>
                <Link href="/" className="block md:hidden">
                  <img
                    src="/garapin_logo_g_white.svg"
                    alt="Garapin Logo"
                    style={{ maxHeight: "40px" }}
                  />
                </Link>
              </Box>
              {searchVariant && (
                <Box className="hidden md:flex bg-white rounded-md h-10 items-center">
                  <SearchIconWrapper>
                    <SearchIcon style={{ color: "#713F97" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    className="items-center"
                    inputRef={fieldRef}
                    placeholder={t("appBar.searchBarText") ?? "Cari..."}
                    inputProps={{ "aria-label": "search" }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    onSubmit={handleSubmit}
                  />
                </Box>
              )}
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                flexShrink: 1,
              }}
            >
              <Box
                className="hidden items-center md:flex"
              >
                <LanguageSelector>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <NativeSelect
                        disableUnderline={true}
                        value={i18n.resolvedLanguage}
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                        onChange={(e) =>
                          switchToLocale(e.target.value as string)
                        }
                      >
                        <option
                          value={"id"}
                          disabled={i18n.resolvedLanguage === "id"}
                        >
                          Indonesia
                        </option>
                        <option
                          value={"en"}
                          disabled={i18n.resolvedLanguage === "en"}
                        >
                          English
                        </option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </LanguageSelector>
              </Box>
              {!auth.loading &&
                auth.authUser == null &&
                router.pathname !== "/login" && (
                  <Link
                    href="/login"
                    style={{ paddingTop: "4px", paddingBottom: "4px" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#FFFFFF",
                        color: "#713F97",
                      }}
                    >
                      {t("appBar.loginButton")}
                    </Button>{" "}
                  </Link>
                )}
              {!auth.loading && auth.authUser !== null && (
                <>
                  <Box
                    className="self-center cursor-pointer"
                    onClick={() => router.push("/cart")}
                  >
                    <ShoppingCartOutlinedIcon />
                  </Box>
                </>
              )}
              {!auth.loading && auth.authUser !== null && (
                <>
                  <Box>
                    <IconButton onClick={handleClick}>
                      <Avatar sx={{ ml: 2 }} />
                      <Typography
                        className="hidden md:block"
                        variant="body1"
                        sx={{ color: "#ffffff", pl: 2 }}
                      >
                        {auth.authUser.displayName ?? auth.authUser.email}
                      </Typography>
                    </IconButton>
                  </Box>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    className={classes.menuAppBar}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem className="flex md:hidden">
                      <Typography
                        variant="body1"
                      >
                        {auth.authUser.displayName ?? auth.authUser.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Link href="/transaction-list">
                        {t("appBar.menu.profile")}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>
                      {t("appBar.menu.logout")}
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default withTranslation("common")(GarapinAppBar);
