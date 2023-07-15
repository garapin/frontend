export const numberFormat = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
