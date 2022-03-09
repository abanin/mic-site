import React from "react";
import { dehydrate, QueryClient } from "react-query";
import OrderLayout from "layouts/OrderLayout";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";

const Order = () => {
  const router = useRouter();

  const id = router.query.id;

  const onSubmit = (params: {}) => {
    //
  };

  return (
    <>
      <Head>
        <title>МИЦ | Оборудование</title>
        <meta
          name="description"
          content="Убираем барьеры на пути создателей новых технологий и продуктов, отвечающих вызовам современного мира 
"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <OrderLayout
        title="Запрос на использование 
  единицы оборудования"
        desc="На данной странице вы можете оставить запрос на использование какого-либо оборудования МИЦ"
        onSubmit={onSubmit}
      >
        Hello
      </OrderLayout>
      <Footer />
    </>
  );
};

export default Order;

export const getStaticProps: GetStaticProps<{
  dehydratedState: ReturnType<typeof dehydrate>;
}> = async () => {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery(keys.footer, getFooter)]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
