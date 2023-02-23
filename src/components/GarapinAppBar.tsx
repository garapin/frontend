import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, Container, FormControl, IconButton, Menu, MenuItem, NativeSelect, Typography} from "@mui/material";
import {FormEventHandler, useCallback, useEffect, useState} from "react";
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import Link from 'next/link';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.8),
    },
    marginLeft: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: '#713F97',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '70ch',
            '&:focus': {
                width: '80ch',
            },
        },
    },
}));

const LanguageSelector = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    paddingLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
}));


export default function GarapinAppBar({
                                          searchVariant = false,
                                          onSearchSubmit
                                      }: { searchVariant?: boolean, onSearchSubmit?: FormEventHandler<HTMLDivElement> }) {

    const {i18n} = useTranslation();
    const {language: currentLanguage} = i18n;
    const router = useRouter();
    const locales = router.locales ?? [currentLanguage];
    const auth = useFirebaseAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
    }, [auth]);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        setAnchorEl(null);
        await auth.signOut();
        console.log("sign out");
    }

    console.log("state auth: ", auth.authUser);
    console.log("loading auth:", auth.loading);

    const switchToLocale = useCallback(
        (locale: string) => {
            const path = router.asPath;

            return router.push(path, path, {locale});
        },
        [router]
    );

    console.log("resolved lang:", i18n.resolvedLanguage);
    return (
        <Container maxWidth="xl">
            <AppBar position="fixed" style={{zIndex: 1300}}>
                <Toolbar>
                    <Box className={`flex flex-row justify-between w-full`}>
                        <Box className="flex flex-row">
                            <Box className="mr-3" sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                flexShrink: 1
                            }}>
                                <Link href="/" className="hidden md:block">
                                    <img src="/garapin_logo_white.svg" alt="Garapin Logo" style={{maxHeight: '40px'}}/>
                                </Link>
                                <Link href="/" className="block md:hidden">
                                    <img src="/garapin_logo_g_white.svg" alt="Garapin Logo" style={{maxHeight: '40px'}}/>
                                </Link>
                            </Box>
                            {searchVariant && <Search className="flex flex-col justify-center  hidden md:block">
                                <SearchIconWrapper>
                                    <SearchIcon style={{color: '#713F97'}}/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    className="items-center h-full"
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
                                    onSubmit={(event) => {
                                        router.push('/product-list');
                                    }}
                                />
                            </Search>}
                        </Box>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexShrink: 1
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                flexShrink: 1
                            }}>
                                <LanguageSelector>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <NativeSelect
                                                disableUnderline={true}
                                                value={i18n.resolvedLanguage}
                                                inputProps={{
                                                    name: "age",
                                                    id: "uncontrolled-native"
                                                }}
                                                onChange={(e) => switchToLocale(e.target.value as string)}
                                            >
                                                <option value={"id"}
                                                        disabled={i18n.resolvedLanguage === 'id'}>Indonesia
                                                </option>
                                                <option value={"en"} disabled={i18n.resolvedLanguage === 'en'}>English
                                                </option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>
                                </LanguageSelector>
                            </Box>
                            {(!auth.loading && auth.authUser == null && router.pathname !== '/login') &&
                                <Link href="/login" style={{paddingTop:'4px', paddingBottom:'4px'}}><Button variant="contained"
                                                            sx={{
                                                                backgroundColor: '#FFFFFF',
                                                                color: '#713F97',
                                                            }}
                                >MASUK</Button> </Link>}
                            {(!auth.loading && auth.authUser !== null) && <>
                                <Box>
                                    <IconButton onClick={handleClick}>
                                        <Avatar sx={{ml: 2}}/>
                                        <Typography variant='body1'
                                                    sx={{color: '#ffffff', pl: 2}}>{auth.authUser.email}</Typography>
                                    </IconButton>
                                </Box>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                                </Menu>
                            </>}

                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Container>
    );
}