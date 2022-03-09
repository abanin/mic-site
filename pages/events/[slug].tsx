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
import eventKeys from "api/events/keys";
import useEventQuery, { getEvent } from "api/events/useEventQuery";
import { getEvents } from "api/events/useEventsQuery";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";
import getDate from "./helpers/getDate";

import styles from "./styles.module.scss";

const Event = () => {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";

  const eventQuery = useEventQuery(slug, { select: ({ data }) => data[0] });

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
      {eventQuery.isSuccess && (
        <ItemLayout
          title={eventQuery.data.attributes.name}
          desc={getDate(
            eventQuery.data.attributes.date,
            eventQuery.data.attributes.endDate
          )}
          content={eventQuery.data.attributes.content}
          mainImageSrc={createImageUrl(
            eventQuery.data.attributes.image.data.attributes.url
          )}
          renderActions={() => <Button>Записаться</Button>}
        />
      )}

      <Footer className={styles.footer} />
    </>
  );
};

export default Event;

export async function getStaticPaths() {
  const events = await getEvents();

  const paths = events.data.map((event) => ({
    params: {
      slug: event.attributes.slug.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  {
    dehydratedState: ReturnType<typeof dehydrate>;
  },
  { slug: string }
> = async ({ params }) => {
  if (!params) throw new Error("");

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(keys.footer, getFooter),
    queryClient.prefetchQuery(eventKeys.event(params.slug), () =>
      getEvent(params.slug)
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
