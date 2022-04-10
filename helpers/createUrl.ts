import qs from "qs";

const createUrl = (
  urlString: string,
  params?: Record<string, unknown> | string | null
) => {
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
