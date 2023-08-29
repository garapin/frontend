export const toDate = (date: FirebaseDate | Date) => {
  if (date === undefined) return undefined;
  if (date instanceof Date) return date;
  return new Date(date.seconds * 1000);
}