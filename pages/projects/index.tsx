import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { useDebounce } from "react-use";
import useReducerAsState from "hooks/useReducerAsState";
import ListLayout from "layouts/ListLayout";
import MainLayout from "layouts/MainLayout";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import CommonCard from "views/CommonCard";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Tabs from "@/components/Tabs";
import keys from "api/keys";
import projectKeys from "api/project/keys";
import { Project } from "api/project/types";
import {
  getInfiniteProjects,
  useInfiniteProjectsQuery,
} from "api/project/useInfiniteProjectsQuery";
import { getFooter } from "api/useFooterQuery";

import styles from "./index.module.scss";

type State = {
  searchValue: string;
  debouncedSearchValue: string;
  status: "completed" | "WIP";
};

const renderItem = (item: Project) => (
  <Link href={`/projects/${item.Slug}`} passHref>
    <a>
      <CommonCard
        title={item.name}
        desc={item.description}
        mediaSrc={item.previewImage.data.attributes.url}
      />
    </a>
  </Link>
);

const TABS = ["Завершённые", "В разработке", "Заявки на проекты"];

const Projects: NextPage = () => {
  const [state, setState] = useReducerAsState<State>({
    searchValue: "",
    debouncedSearchValue: "",
    status: "completed",
  });

  const { searchValue, debouncedSearchValue } = state;

  useDebounce(() => setState({ debouncedSearchValue: searchValue }), 1000, [
    searchValue,
  ]);

  const infProjectsQuery = useInfiniteProjectsQuery({
    searchValue: debouncedSearchValue,
  });

  const items = infProjectsQuery.data?.pages
    .flatMap((page) => page.data)
    .map((item) => item.attributes);

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
      <MainLayout
        className={styles.main}
        title="Проекты наших студентов"
        btn={<Button>Создать запрос на проект</Button>}
      />
      <Container style={{ marginTop: 40 }}>
        <Tabs
          tabs={TABS}
          defaultActiveTab={TABS[0]}
          keyAccessor={(tab) => tab}
          valueFormatter={(tab) => tab}
        />
        <div className={styles.controls}>
          <Input
            className={styles.input}
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e) => setState({ searchValue: e.target.value })}
          />
          <Input placeholder="Поиск по названию" />
        </div>
      </Container>
      <ListLayout
        items={items}
        keyAccessor={(item) => item.Slug}
        hasNext={infProjectsQuery.hasNextPage}
        fetchNext={infProjectsQuery.fetchNextPage}
        renderItem={renderItem}
      />
      <Footer className={styles.footer} />
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(keys.footer, getFooter),
    queryClient.prefetchQuery(projectKeys.infinity(""), () =>
      getInfiniteProjects({ page: 1 }, (data) => ({
        pages: [data],
        pageParam: [data.meta.pagination.page],
      }))
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Projects;
