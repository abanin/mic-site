const stringCutter = (string: string, maxLength = 230) => {
  return string.length > maxLength
    ? string.slice(0, maxLength).concat("...")
    : string;
};

export default stringCutter;
