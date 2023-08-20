export const numberFormat = (num: number) => {
  // ubah angka ke format ribuan, separator menggunakan titik dan desimal menggunakan koma
  return num.toLocaleString("id-ID");
};

export const capitalizeString = (str: string) => {
  return str.toUpperCase().replace(/_/g, " ");
};

export const uppercaseString = (str: string) => {
  // model-cetak to Model Cetak
  return str
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const changeCurrency = (value: any) => {
  if (typeof value === "string") {
    return parseInt(value.replace(/[^0-9]/g, ""));
  }
  return value;
};
