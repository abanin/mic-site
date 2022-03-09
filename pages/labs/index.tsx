import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { useDebounce } from "react-use";
import createImageUrl from "helpers/createImageUrl";
import useReducerAsState from "hooks/useReducerAsState";
import ListLayout from "layouts/ListLayout";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import WideCard, { WideCardSkeleton } from "views/WideCard";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import H1 from "@/components/H1";
import Header from "@/components/Header";
import Input from "@/components/Input";
import keys from "api/keys";
import labsKeys from "api/labs/keys";
import { Lab } from "api/labs/types";
import {
  getInfiniteLabs,
  useInfiniteLabsQuery,
} from "api/labs/useInfiniteLabsQuery";
import { getFooter } from "api/useFooterQuery";

import styles from "./styles.module.scss";

const renderSkeletonItem = () => {
  return <WideCardSkeleton />;
};

const renderItem = (item: {
  id: number;
  attributes: Pick<Lab, "name" | "description" | "previewImage">;
}) => {
  return (
    <Link href={`/labs/${item.id}`} passHref>
      <a>
        <WideCard
          imageSrc={createImageUrl(
            item.attributes.previewImage.data.attributes.url
          )}
          desc={item.attributes.description}
          title={item.attributes.name}
        />
      </a>
    </Link>
  );
};

const Labs: NextPage = () => {
  const [state, setState] = useReducerAsState({
    searchValue: "",
    debouncedSearchValue: "",
  });

  const { searchValue, debouncedSearchValue } = state;

  useDebounce(
    () => {
      setState({ debouncedSearchValue: searchValue });
    },
    1000,
    [searchValue]
  );

  const infLabsQuery = useInfiniteLabsQuery(
    {
      searchValue: debouncedSearchValue,
    },
    8
  );

  const items = infLabsQuery.data
    ? infLabsQuery.data.pages.flatMap((page) => page.data)
    : null;

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
      <Container>
        <H1>Лаборатории МИЦ</H1>
        <div className={styles.controls}>
          <Input
            className={styles.input}
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e) => setState({ searchValue: e.target.value })}
          />
        </div>
      </Container>
      <ListLayout
        items={items}
        loading={infLabsQuery.isLoading}
        renderSkeletonItem={renderSkeletonItem}
        keyAccessor={(item) => item.id}
        hasNext={infLabsQuery.hasNextPage}
        fetchNext={infLabsQuery.fetchNextPage}
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
    queryClient.prefetchQuery(labsKeys.infinity(""), () =>
      getInfiniteLabs({ page: 1 }, (data) => {
        return {
          pages: [data],
          pageParam: [data.meta.pagination.page],
        };
      })
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Labs;
