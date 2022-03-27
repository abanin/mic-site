import qs from "qs";

console.log("hello2", process.env.NEXT_PUBLIC_API_URL);
const createUrl = (
  urlString: string,
  params?: Record<string, unknown> | string | null
) => {
  console.log("hello", process.env.NEXT_PUBLIC_API_URL);
  let url = new URL(`/api${urlString}`, process.env.NEXT_PUBLIC_API_URL);

  if (!params) return url.href;
  if (typeof params === "string")
    return `${url.href}${params[0] === "?" ? "" : "?"}${params}`;

  const stringifiedParams = qs.stringify(params, {
    addQueryPrefix: true,
    encodeValuesOnly: true,
  });
  return `${url.href}${stringifiedParams}`;
};

export default createUrl;
