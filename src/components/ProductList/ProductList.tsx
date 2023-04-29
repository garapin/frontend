import React, { useState } from 'react'
import { getAllProducts } from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { Grid } from '@mui/material';
import CardVertical from '../CardVertical';

const ProductList = ({ productList }: { productList:[] }) => {
  // const [allProduct, setAllProduct] = useState([])
  // const dispatch = useAppDispatch()

  // const { products, isProductLoading, allProductsLoaded } = useAppSelector(state => state.products);

  // React.useEffect(() => {
  //   dispatch(getAllProducts());
  // }, [])

  console.log(productList, 'testaa');

  return (
    <>{productList.map((product: any) => (
      <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
        <CardVertical key={product.id} imageUrl={product.img[0]} productName={product.productName}
          price={`Rp${product.minPrice}`} location="Jakarta" slug={product.slug} />
      </Grid>
    ))}</>
  )
}

export default ProductList