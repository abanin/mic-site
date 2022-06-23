import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { useDebounce } from "react-use";
import createImageUrl from "helpers/createImageUrl";
import useReducerAsState from "hooks/useReducerAsState";
import ListLayout from "layouts/ListLayout";
import MainLayout from "layouts/MainLayout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import CommonCard, { CommonCardSkeleton } from "views/CommonCard";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { MultiSelect } from "@/components/Select";
import keys from "api/keys";
import projectKeys from "api/project/keys";
import { Project } from "api/project/types";
import {
  getInfiniteProjects,
  useInfiniteProjectsQuery,
} from "api/project/useInfiniteProjectsQuery";
import { getFooter } from "api/useFooterQuery";
import useLinksQuery from "api/useLinksQuery";
import useProjectCategoriesQueryQuery, {
  getProjectCategories,
} from "api/useProjectCategoriesQuery";

import styles from "./index.module.scss";

type State = {
  searchValue: string;
  debouncedSearchValue: string;
  categoryTypes: string[];
  status: "completed" | "WIP";
};

const renderItem = (item: Project) => (
  <li className={styles.item} key={item.Slug}>
    <Link href={`/projects/${item.Slug}`} passHref>
      <a className={styles.cardWrapper}>
        <CommonCard
          className={styles.card}
          title={item.name}
          desc={item.description}
          mediaSrc={createImageUrl(item.previewImage.data.attributes.url)}
        />
      </a>
    </Link>
  </li>
);

const renderSkeletonItem = () => <CommonCardSkeleton />;

const Projects: NextPage = () => {
  const [state, setState] = useReducerAsState<State>({
    searchValue: "",
    categoryTypes: [],
    debouncedSearchValue: "",
    status: "completed",
  });

  const { searchValue, debouncedSearchValue, status, categoryTypes } = state;

  useDebounce(() => setState({ debouncedSearchValue: searchValue }), 1000, [
    searchValue,
  ]);

  const projectCategoriesQuery = useProjectCategoriesQueryQuery({
    select: ({ data }) => data.map(({ attributes }) => attributes),
  });

  const linksQuery = useLinksQuery({
    select: ({ data }) => data.attributes,
  });

  const infProjectsQuery = useInfiniteProjectsQuery({
    searchValue: debouncedSearchValue,
    status,
    categoryTypes,
  });

  const items = infProjectsQuery.data?.pages
    .flatMap((page) => page.data)
    .map((item) => item.attributes);

  const btn =
    linksQuery.isSuccess && linksQuery.data.createProject ? (
      <Link href={linksQuery.data.createProject} passHref>
        <a>
          <Button>Создать свой проект</Button>
        </a>
      </Link>
    ) : null;

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
        image="/home/quadro2.png"
        title="Проекты наших студентов"
        cardDesc="На базе Молодежного Инженерного Центра каждый студент МГТУ им. Н.Э. Баумана может реализовать свой проект: от идеи до первых продаж. Самое время переходить от мечтаний к делу, становясь частью инженерного сообщества"
        btn={btn}
      />
      <Container style={{ marginTop: 40 }}>
        <div className={styles.controls}>
          <Input
            className={styles.input}
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e) => setState({ searchValue: e.target.value })}
          />
          {projectCategoriesQuery.isSuccess && (
            <MultiSelect
              options={projectCategoriesQuery.data}
              optionFormatter={(option) => option.name}
              valueFormatter={(options) =>
                options.length ? `Выбрано: ${options.length}` : "Категории"
              }
              keyAccessor={(option) => option.type}
              onChange={(options) => {
                setState({
                  categoryTypes: options.map((option) => option.type),
                });
              }}
            />
          )}
        </div>
      </Container>
      <ListLayout
        items={items}
        loading={infProjectsQuery.isLoading}
        keyAccessor={(item) => item.Slug}
        hasNext={infProjectsQuery.hasNextPage}
        fetchNext={infProjectsQuery.fetchNextPage}
        renderItem={renderItem}
        renderSkeletonItem={renderSkeletonItem}
      />
      <Footer className={styles.footer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(keys.footer, getFooter),
    queryClient.prefetchQuery(keys.projectCategories, getProjectCategories),
    queryClient.prefetchQuery(projectKeys.infinity("", "completed", []), () =>
      getInfiniteProjects({ page: 1, pageSize: 8 }, (data) => ({
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
