export const KelvinToCelsiusDegree: (k: number) => number = (k: number) => {
  return Math.round(10 * (k - 273.14)) / 10; // Cut out second and subsequent decimals - JS can be funny here
}
