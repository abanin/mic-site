import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { NextPage } from "next";
import Head from "next/head";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import H1 from "@/components/H1";
import Header from "@/components/Header";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";
import List from "./components/List";

const Labs: NextPage = () => {
  return (
    <>
      <Head>
        <title>МИЦ | Лаборатории</title>
        <meta
          name="description"
          content="Убираем барьеры на пути создателей новых технологий и продуктов, отвечающих вызовам современного мира 
"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container style={{ marginTop: 60 }}>
        <H1>Лаборатории МИЦ</H1>
      </Container>
      <List />
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

export default Labs;
