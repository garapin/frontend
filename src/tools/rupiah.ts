export const rupiah = (number: number|bigint, options?: Intl.NumberFormatOptions)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...options
    }).format(number);
  }