import { Product } from "@/types/product";

export const rupiah = (number: number|bigint, options?: Intl.NumberFormatOptions)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...options
    }).format(number);
  }

  export const getProductPrice = (product: Product) => {
    if (product.category === "01") {
      return rupiah(product.maxPrice);
    } else {
      return `${rupiah(product.minPrice)} - ${rupiah(
        product.maxPrice)}`;
    }
  };