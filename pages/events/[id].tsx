import React from "react";
import { dehydrate, QueryClient } from "react-query";
import ItemLayout from "layouts/ItemLayout";
import Head from "next/head";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";

const Event = () => {
  return (
    <>
      <Head>
        <title>МИЦ | Мероприятия</title>
        <meta
          name="description"
          content="Убираем барьеры на пути создателей новых технологий и продуктов, отвечающих вызовам современного мира 
"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ItemLayout
        title="Первый научный выезд"
        desc="22-24 апреля"
        content="HELLO WORLd"
        mainImageSrc="/event.svg"
        renderActions={() => <Button>Записаться</Button>}
      />
      <Footer />
    </>
  );
};

export default Event;

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

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery(keys.footer, getFooter)]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
