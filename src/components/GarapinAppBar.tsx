import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {FormControl, NativeSelect} from "@mui/material";

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

export default function GarapinAppBar({searchVariant = false}: { searchVariant?: boolean }) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Box className="flex flex-row justify-between w-full">
                        <Box className="flex flex-row">
                            <Box className="mr-3">
                                <img src="/garapin_logo_white.svg" alt="Garapin Logo"/>
                            </Box>
                            {searchVariant && <Search>
                                <SearchIconWrapper>
                                    <SearchIcon style={{color: '#713F97'}}/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
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
                                            defaultValue={"id-ID"}
                                            inputProps={{
                                                name: "age",
                                                id: "uncontrolled-native"
                                            }}
                                        >
                                            <option value={"id-ID"}>Indonesia</option>
                                            <option value={"en-US"}>English</option>
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