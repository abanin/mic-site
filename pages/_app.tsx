import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";

import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ToastContainer pauseOnHover position="top-right" autoClose={8000} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
