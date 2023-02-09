import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {FormControl, NativeSelect} from "@mui/material";
import {FormEventHandler, useCallback} from "react";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

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

    const switchToLocale = useCallback(
        (locale: string) => {
          const path = router.asPath;
      
          return router.push(path, path, { locale });
        },
        [router]
      );

    console.log("resolved lang:", i18n.resolvedLanguage);
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Box className="flex flex-row justify-between w-full">
                        <Box className="flex flex-row">
                            <Box className="mr-3">
                                <img src="/garapin_logo_white.svg" alt="Garapin Logo" width="114"/>
                            </Box>
                            {searchVariant && <Search>
                                <SearchIconWrapper>
                                    <SearchIcon style={{color: '#713F97'}}/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
                                    onSubmit={onSearchSubmit}
                                />
                            </Search>}
                        </Box>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'row'
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
                                            <option value={"id"} disabled={i18n.resolvedLanguage === 'id'}>Indonesia</option>
                                            <option value={"en"} disabled={i18n.resolvedLanguage === 'en'}>English</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </LanguageSelector>
                            {searchVariant && <Button variant="contained"
                                                      style={{
                                                          backgroundColor: '#FFFFFF',
                                                          color: '#713F97'
                                                      }}>MASUK</Button>}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}