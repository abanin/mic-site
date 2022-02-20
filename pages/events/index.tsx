import React from "react";
import { dehydrate, QueryClient } from "react-query";
import MainLayout from "layouts/MainLayout";
import Head from "next/head";
import Link from "next/link";
import StoryCard from "views/StoryCard";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Section from "@/components/Section";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";

import styles from "./styles.module.scss";

const Events = () => {
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
        cardDesc="Получай полезные навыки, открывай доступ к новому оборудованию, популяризируй свои идеи в научном сообществе, выигрывай гранты на разработку своих проектов и заводи новые знакомства"
      />

      <Section title="Мероприятия">
        <div className={styles.grid}>
          <Link href="#" passHref>
            <a>
              <StoryCard topTitle="Hello" bottomTitle="World" />
            </a>
          </Link>
        </div>
      </Section>

      <Section title="Олимпиады и конференции">
        <div className={styles.grid}>
          <Link href="#" passHref>
            <a>
              <StoryCard topTitle="Hello" bottomTitle="World" />
            </a>
          </Link>
        </div>
      </Section>
      <Section title="Проектные конкурсы">
        <div className={styles.grid}>
          <Link href="#" passHref>
            <a>
              <StoryCard topTitle="Hello" bottomTitle="World" />
            </a>
          </Link>
        </div>
      </Section>
      <Section title="Образовательные программы">
        <div className={styles.grid}>
          <Link href="#" passHref>
            <a>
              <StoryCard topTitle="Hello" bottomTitle="World" />
            </a>
          </Link>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default Events;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([queryClient.prefetchQuery(keys.footer, getFooter)]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
