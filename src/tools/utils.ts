export const numberFormat = (num: number) => {
  // ubah angka ke format ribuan, separator menggunakan titik dan desimal menggunakan koma
  return Number(num).toLocaleString("id-ID");
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

export const formatDateTime = (date?: Date) => {
  return date !== undefined
    ? new Date(date).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        dateStyle: "long",
        timeStyle: "long",
      })
    : "";
};

export const getCategoryLabel = (category: string) => {
  if (category === "03") {
    return "Custom Packaging";
  } else if (category === "02") {
    return "Digital Packaging";
  } else {
    return "Ready To Buy";
  }
};
