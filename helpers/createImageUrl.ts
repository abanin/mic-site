const createImageUrl = (urlString: string) => {
  let url = new URL(urlString, process.env.NEXT_PUBLIC_API_URL);
  return url.toString();
};

export default createImageUrl;
