import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { NextPage } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";
import { getHomePage } from "api/useHomePageQuery";
import Contacts from "./components/Contacts";
import Equipment from "./components/Equipment";
import Events from "./components/Events";
import Labs from "./components/Labs";
import Main from "./components/Main";
import Partners from "./components/Partners";
import Projects from "./components/Projects";
import Students from "./components/Students";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>МИЦ</title>
        <meta
          name="description"
          content="Убираем барьеры на пути создателей новых технологий и продуктов, отвечающих вызовам современного мира"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Projects />
      <Partners />
      <Equipment />
      <Students />
      <Labs />
      <Events />
      <Contacts />
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(keys.homePage, getHomePage),
    queryClient.prefetchQuery(keys.footer, getFooter),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
