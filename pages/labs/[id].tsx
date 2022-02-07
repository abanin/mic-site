import React from "react";
import { dehydrate, QueryClient } from "react-query";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";
import Content from "./components/Article";

const Lab = () => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery(keys.footer, getFooter)]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
    ],
    fallback: false,
  };
}

export default Lab;
