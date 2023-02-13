const inputPriceFormat = (str: string) => {
  console.log("s", str);
  const comma = (str: string) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };
  const uncomma = (str: string) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  };
  return comma(uncomma(str));
};

export default inputPriceFormat;
