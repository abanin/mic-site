import React from "react";
import { dehydrate, QueryClient } from "react-query";
import createImageUrl from "helpers/createImageUrl";
import ItemLayout from "layouts/ItemLayout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import keys from "api/keys";
import labsKeys from "api/labs/keys";
import { useLabQuery } from "api/labs/useLabQuery";
import { getFooter } from "api/useFooterQuery";

import styles from "./styles.module.scss";

const Lab = () => {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : "";
  const labQuery = useLabQuery(id, {
    select: ({ data }) => {
      return { id: data.id, ...data.attributes };
    },
  });

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
      {labQuery.isSuccess && (
        <ItemLayout
          title={labQuery.data.name}
          mainImageSrc={createImageUrl(labQuery.data.image.data.attributes.url)}
          content={labQuery.data.content}
          renderActions={() => (
            <>
              {labQuery.data.phone && (
                <Link href={`tel:${labQuery.data.phone}`} passHref>
                  <a className={styles.iconWrapper}>
                    <Icon
                      className={styles.icon}
                      classNameSvg={styles.svg}
                      iconName="phone"
                    />
                  </a>
                </Link>
              )}
              {labQuery.data.email && (
                <Link href={`mailto:${labQuery.data.email}`} passHref>
                  <a className={styles.iconWrapper}>
                    <Icon
                      className={styles.icon}
                      classNameSvg={styles.svg}
                      iconName="mail"
                    />
                  </a>
                </Link>
              )}
            </>
          )}
        />
      )}

      <Footer className={styles.footer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  {
    dehydratedState: ReturnType<typeof dehydrate>;
  },
  { id: string }
> = async (context) => {
  if (!context.params) throw new Error("Error");

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(keys.footer, getFooter),
    queryClient.prefetchQuery(labsKeys.lab(context.params.id)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Lab;
