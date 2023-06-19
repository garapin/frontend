import React from 'react'
import { Grid } from '@mui/material';
import CardVertical from '../CardVertical';

const ProductList = ({ productList }: { productList:[] }) => {
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