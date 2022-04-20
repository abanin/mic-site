import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { toast } from "react-toastify";
import createImageUrl from "helpers/createImageUrl";
import OrderLayout from "layouts/OrderLayout";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HorizontalCard from "views/HorizontalCard";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useEquipmentOrderMutation from "api/equipment/useEquipmentOrderMutation";
import { useEquipmentQuery } from "api/equipment/useEquipmentQuery";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";

const Order = () => {
  const router = useRouter();

  const id = typeof router.query.id === "string" ? router.query.id : "";

  const orderMutation = useEquipmentOrderMutation();
  const equipmentQuery = useEquipmentQuery(id, {
    select: ({ data }) => data.attributes,
  });

  const onSubmit = async (params: {
    fio: string;
    phone: string;
    email: string;
  }) => {
    if (!params.email || !params.fio || !params.phone) {
      toast("Заполните все поля", {
        type: "error",
      });
      return;
    }
    orderMutation.mutate(
      { id, ...params },
      {
        onSuccess: () => {
          toast("Запрос успешно отправлен!", {
            type: "success",
          });
        },
        onError: () => {
          toast("При отправлении запроса произошла ошибка. Попробуйте снова.", {
            type: "error",
          });
        },
      }
    );
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
      {equipmentQuery.isSuccess && (
        <OrderLayout
          title="Запрос на использование 
единицы оборудования"
          desc="На данной странице вы можете оставить запрос на использование какого-либо оборудования МИЦ"
          onSubmit={onSubmit}
        >
          <HorizontalCard
            style={{ width: "70%" }}
            title={equipmentQuery.data.name}
            desc={equipmentQuery.data.description}
            mediaSrc={createImageUrl(
              equipmentQuery.data.avatar.data.attributes.url
            )}
            renderActions={() => (
              <Link href="/equipments" passHref>
                <a>
                  <Button>Сменить оборудование</Button>
                </a>
              </Link>
            )}
          />
        </OrderLayout>
      )}

      <Footer style={{ marginTop: 90 }} />
    </>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps<{
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
