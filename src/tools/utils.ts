export const numberFormat = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const capitalizeString = (str: string) => {
    return str.toUpperCase().replace(/_/g, ' ');
}