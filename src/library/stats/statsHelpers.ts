export const cleanURL = (string: string) => {
  let firstPeriodIndex = string.indexOf(".");
  let lastPeriodIndex = string.lastIndexOf(".");
  return string.slice(firstPeriodIndex + 1, lastPeriodIndex);
};
