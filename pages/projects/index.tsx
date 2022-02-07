import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { NextPage } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";
import List from "./components/List";
import Main from "./components/Main";

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>МИЦ | Проекты</title>
        <meta
          name="description"
          content="Убираем барьеры на пути создателей новых технологий и продуктов, отвечающих вызовам современного мира 
"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
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

export default Projects;
