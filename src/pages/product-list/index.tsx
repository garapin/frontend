import {Box, Divider, Grid, InputAdornment, TextField} from "@mui/material";
import LoginPage from "@/pages/login";
import GarapinAppBar from "@/components/GarapinAppBar";
import CardVertical from "@/components/CardVertical";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useRouter} from 'next/router';
import GarapinFooter from "@/components/GarapinFooter";

const productData = [
    {
        id: 1,
        name: 'Product 1',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 3,
        name: 'Product 3',
        price: 30000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 4,
        name: 'Product 4',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 5,
        name: 'Product 5',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 6,
        name: 'Product 6',
        price: 30000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 7,
        name: 'Product 7',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 8,
        name: 'Product 8',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 9,
        name: 'Product 9',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 10,
        name: 'Product 10',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 11,
        name: 'Product 11',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 12,
        name: 'Product 12',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 13,
        name: 'Product 13',
        price: 10000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    },
    {
        id: 14,
        name: 'Product 14',
        price: 20000,
        image: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
    }
];

const IndexPage = () => {

    const router = useRouter();

    return (
        <Box>
            <GarapinAppBar searchVariant={true}/>
            <Box className="max-w-xl px-10 pt-20 block md:hidden">
                <TextField placeholder="Saya mau buat..." fullWidth
                           InputProps={{
                               endAdornment: <InputAdornment position="end"><Button
                                   variant="contained"
                                   color="garapinColor"
                                   onClick={(event) => {
                                       router.push('/product-list');
                                   }}
                               >Cari</Button></InputAdornment>,
                           }}
                ></TextField>
            </Box>
            <Box className="flex flex-col md:px-80 py-4 md:py-20">
                <Typography className="px-10 md:px-0" variant="h6" color="text.primary">Menampilkan 543 hasil untuk pencarian “Food packaging”</Typography>
                <Grid className="px-10 md:px-0 pt-4 md:pt-8" container spacing={4}>
                    {productData.map((product) => (
                        <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
                            <CardVertical key={product.id} imageUrl={product.image} productName={product.name}
                                          price={`Rp${product.price}`} location="Jakarta"/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <GarapinFooter/>
        </Box>
    )
}

LoginPage.authGuard = false;
LoginPage.guestGuard = true;

export default IndexPage;