import React from "react";
import { dehydrate, QueryClient } from "react-query";
import MainLayout from "layouts/MainLayout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import StoryCard from "views/StoryCard";

import Container from "@/components/Container";
import Disclosure from "@/components/Disclosure";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import eventKeys from "api/events/keys";
import { getEvents, useEventsQuery } from "api/events/useEventsQuery";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";
import getDate from "./helpers/getDate";

import styles from "./styles.module.scss";

const Events = () => {
  const router = useRouter();

  const { open } = router.query;

  const eventsQuery = useEventsQuery({
    select: ({ data }) => data,
  });

  const events = eventsQuery.isSuccess
    ? eventsQuery.data.filter((event) => event.attributes.type === "event")
    : [];
  const olympics = eventsQuery.isSuccess
    ? eventsQuery.data.filter(
        (event) => event.attributes.type === "olympicOrConference"
      )
    : [];
  const competitions = eventsQuery.isSuccess
    ? eventsQuery.data.filter(
        (event) => event.attributes.type === "competition"
      )
    : [];

  const educationPrograms = eventsQuery.isSuccess
    ? eventsQuery.data.filter(
        (event) => event.attributes.type === "educationProgram"
      )
    : [];
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
      <MainLayout
        title="Мероприятия МИЦ"
        image="/home/badge.png"
        cardDesc="Получай полезные навыки, открывай доступ к новому оборудованию, популяризируй свои идеи в научном сообществе, выигрывай гранты на разработку своих проектов и заводи новые знакомства"
      />
      {eventsQuery.isSuccess && (
        <Container>
          {Boolean(events.length) && (
            <Disclosure
              isDefaultOpen={open === "events"}
              className={styles.disclosure}
              title="Мероприятия"
            >
              <div className={styles.grid}>
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.attributes.slug}`}
                    passHref
                  >
                    <a className={styles.link}>
                      <StoryCard
                        image={event.attributes.image.data.attributes.url}
                        topTitle={event.attributes.name}
                        bottomTitle={getDate(
                          event.attributes.date,
                          event.attributes.endDate
                        )}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </Disclosure>
          )}

          {Boolean(olympics.length) && (
            <Disclosure
              isDefaultOpen={open === "olympics"}
              className={styles.disclosure}
              title="Олимпиады и конференции"
            >
              <div className={styles.grid}>
                {olympics.map((olympic) => (
                  <Link
                    key={olympic.id}
                    href={`/events/${olympic.attributes.slug}`}
                    passHref
                  >
                    <a className={styles.link}>
                      <StoryCard
                        image={olympic.attributes.image.data.attributes.url}
                        topTitle={olympic.attributes.name}
                        bottomTitle={getDate(
                          olympic.attributes.date,
                          olympic.attributes.endDate
                        )}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </Disclosure>
          )}

          {Boolean(competitions.length) && (
            <Disclosure
              isDefaultOpen={open === "competitions"}
              className={styles.disclosure}
              title="Проектные конкурсы"
            >
              <div className={styles.grid}>
                {competitions.map((competition) => (
                  <Link
                    key={competition.id}
                    href={`/events/${competition.attributes.slug}`}
                    passHref
                  >
                    <a className={styles.link}>
                      <StoryCard
                        image={competition.attributes.image.data.attributes.url}
                        topTitle={competition.attributes.name}
                        bottomTitle={getDate(
                          competition.attributes.date,
                          competition.attributes.endDate
                        )}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </Disclosure>
          )}

          {Boolean(educationPrograms.length) && (
            <Disclosure
              isDefaultOpen={open === "educationPrograms"}
              className={styles.disclosure}
              title="Образовательные программы"
            >
              <div className={styles.grid}>
                {educationPrograms.map((program) => (
                  <Link
                    key={program.id}
                    href={`/events/${program.attributes.slug}`}
                    passHref
                  >
                    <a className={styles.link}>
                      <StoryCard
                        image={program.attributes.image.data.attributes.url}
                        topTitle={program.attributes.name}
                        bottomTitle={getDate(
                          program.attributes.date,
                          program.attributes.endDate
                        )}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </Disclosure>
          )}
        </Container>
      )}

      <Footer className={styles.footer} />
    </>
  );
};

export default Events;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(keys.footer, getFooter),
    queryClient.prefetchQuery(eventKeys.all, getEvents),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
