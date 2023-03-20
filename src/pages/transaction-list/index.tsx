import CardVertical from "@/components/CardVertical";
import {getFirestore} from "@/configs/firebase";
import {useAppSelector} from "@/hooks/useAppRedux";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import {getAllProductNext, getAllProducts} from "@/store/modules/products";
import {Product} from "@/types/product";
import {Button, CircularProgress, Divider, Grid, Typography} from "@mui/material";
import {Container} from "@mui/system";
import {i18n} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {faker} from '@faker-js/faker';
import Link from "next/link";

const TransactionListIndex = () => {
    const auth = useFirebaseAuth();
    const {categories} = useAppSelector(state => state.appDefaults);
    const {products, isProductLoading, allProductsLoaded, isFetchingNext} = useAppSelector(state => state.products);
    const dispatch = useDispatch()


    const firestore = getFirestore();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])


    return (
        <div className="py-40 flex-grow flex-fill">
            <Container>
                <Typography variant="h5">Transaction List</Typography>

                {auth.authUser?.authTokenData?.claims['printing']['customer'] &&
                    <Typography>Showing Customer DB</Typography>}
                {auth.authUser?.authTokenData?.claims['printing']['partner'] &&
                    <Typography>Showing Partner DB</Typography>}

                <Typography variant="h5" style={{paddingTop: '40px'}}>Categories:</Typography>
                <Divider/>
                {categories.map((category) => (
                    <p key={category.id}>{category.id} {category.name} {category.slug} channel: {category.channel}</p>
                ))}

                <Typography variant="h5" style={{paddingTop: '40px'}}>Products {isProductLoading &&
                    <CircularProgress size={10}/>}</Typography>
                <Divider/>

                <Grid container>
                    {!isProductLoading && products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{py: 4}} direction="column"
                              display="flex"
                              alignItems="center"
                        >
                            <Link href={`/product-detail/${encodeURIComponent(product.slug)}`}>
                                <CardVertical key={product.id} objectId={product.id ?? ""}
                                              productName={product.productName}
                                              price={`Rp${product.minPrice} - Rp${product.maxPrice}`} location="Jakarta"
                                              imageUrl={product.img[0]}/>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                {!allProductsLoaded &&
                    <Grid item xs={12} alignItems="center" display={'flex'} justifyContent={'center'}>
                        <Button variant="contained" disabled={isFetchingNext}
                                onClick={() => dispatch(getAllProductNext())}>Load more... {isFetchingNext &&
                            <CircularProgress size={10}/>}</Button>
                    </Grid>}
            </Container>
        </div>
    );
}

TransactionListIndex.guestGuard = false
TransactionListIndex.authGuard = true;


export default TransactionListIndex;

export const getServerSideProps = async ({locale}: { locale: string }) => {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ['auth', 'common']))
        }
    }
};