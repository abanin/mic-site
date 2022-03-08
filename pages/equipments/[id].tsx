import React from "react";
import { dehydrate, QueryClient } from "react-query";
import createImageUrl from "helpers/createImageUrl";
import ItemLayout from "layouts/ItemLayout";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import equipmentKeys from "api/equipment/keys";
import {
  getEquipment,
  useEquipmentQuery,
} from "api/equipment/useEquipmentQuery";
import { getEquipments } from "api/equipment/useEquipmentsQuery";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";

import styles from "./styles.module.scss";

const Equipment = () => {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : "";
  const equipmentQuery = useEquipmentQuery(id, {
    select: ({ data }) => data.attributes,
  });

  if (!equipmentQuery.isSuccess) return null;

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
      <ItemLayout
        title={equipmentQuery.data.name}
        mainImageSrc={createImageUrl(
          equipmentQuery.data.avatar.data.attributes.url
        )}
        desc={equipmentQuery.data.equipment_category.data.attributes.name}
        content={equipmentQuery.data.content}
        renderActions={() => <Button>Запрос на оборудование</Button>}
      >
        <h5 className={styles.paramsTitle}>Характеристики оборудования</h5>
        <ul className={styles.params}>
          {equipmentQuery.data.params.map((param) => {
            return (
              <li className={styles.item} key={param}>
                {param}
              </li>
            );
          })}
        </ul>
      </ItemLayout>
      <Footer className={styles.footer} />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  {
    dehydratedState: ReturnType<typeof dehydrate>;
  },
  { id: string }
> = async ({ params }) => {
  if (!params) throw new Error("id must be not empty");

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(keys.footer, getFooter),
    queryClient.prefetchQuery(equipmentKeys.equipment(params.id), () =>
      getEquipment(params.id)
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export async function getStaticPaths() {
  const equipments = await getEquipments();

  const paths = equipments.data.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Equipment;
