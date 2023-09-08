import React from "react";
import { Grid } from "@mui/material";
import CardVertical from "../CardVertical";
import { getProductPrice } from "@/tools/rupiah";
import { getCategoryLabel } from "@/tools/utils";

export const imagePlaceholder =
  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

const ProductList = ({ productList }: { productList: [] }) => {
  return (
    <>
      {productList.map((product: any) => (
        <Grid key={product.id} item xs={6}>
          <CardVertical
            key={product.id}
            imageUrl={product.img[0] ?? imagePlaceholder}
            productName={product.productName}
            price={getProductPrice(product)}
            slug={product.slug}
            category={getCategoryLabel(product.category)}
          />
        </Grid>
      ))}
    </>
  );
};

export default ProductList;
