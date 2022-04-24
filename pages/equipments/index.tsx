import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { useDebounce } from "react-use";
import createImageUrl from "helpers/createImageUrl";
import stringCutter from "helpers/stringCutter";
import useReducerAsState from "hooks/useReducerAsState";
import ListLayout from "layouts/ListLayout";
import MainLayout from "layouts/MainLayout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import CommonCard, { CommonCardSkeleton } from "views/CommonCard";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { MultiSelect } from "@/components/Select";
import equipmentKeys from "api/equipment/keys";
import { Equipment } from "api/equipment/types";
import useEquipmentCategoriesQuery, {
  getEquipmentCategories,
} from "api/equipment/useEquipmentCategories";
import {
  getInfiniteEquipments,
  useInfiniteEquipmentsQuery,
} from "api/equipment/useInfiniteEqupmentsQuery";
import keys from "api/keys";
import { getFooter } from "api/useFooterQuery";

import styles from "./styles.module.scss";

const renderItem = ({
  id,
  attributes,
}: {
  id: number;
  attributes: Equipment;
}) => (
  <Link href={`/equipments/${id}`} passHref>
    <a>
      <CommonCard
        className={styles.card}
        title={attributes.name}
        desc={stringCutter(attributes.description)}
        mediaSrc={createImageUrl(attributes.avatar.data.attributes.url)}
      />
    </a>
  </Link>
);

const renderSkeletonItem = () => <CommonCardSkeleton />;

type State = {
  searchValue: string;
  debouncedSearchValue: string;
  categoryTypes: string[];
};

const Equipments = () => {
  const [state, setState] = useReducerAsState<State>({
    searchValue: "",
    debouncedSearchValue: "",
    categoryTypes: [],
  });

  const { searchValue, debouncedSearchValue, categoryTypes } = state;
  const equipmentCategoriesQuery = useEquipmentCategoriesQuery({
    select: ({ data }) => data.map((item) => item.attributes),
  });

  useDebounce(
    () => {
      setState({
        debouncedSearchValue: searchValue,
      });
    },
    1000,
    [searchValue]
  );

  const infEquipmentsQuery = useInfiniteEquipmentsQuery({
    searchValue: debouncedSearchValue,
    categoryTypes,
  });

  const items = infEquipmentsQuery.isSuccess
    ? infEquipmentsQuery.data.pages.flatMap(({ data }) => data)
    : null;
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
      <MainLayout
        image="/equipments/gear.png"
        title="Оборудование МИЦ"
        cardDesc="Технологическая платформа центра включает огромное количество единиц оборудования, выполняющих широкий диапозон функций. На многих единицах оборудования ты можешь работать лично, пройдя образовательные курсы"
      />
      <Container>
        <div className={styles.controls}>
          <Input
            className={styles.input}
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e) => setState({ searchValue: e.target.value })}
          />
          {equipmentCategoriesQuery.isSuccess && (
            <MultiSelect
              options={equipmentCategoriesQuery.data}
              optionFormatter={(option) => option.name}
              valueFormatter={(options) =>
                options.length ? `Выбрано: ${options.length}` : "Категории"
              }
              keyAccessor={(option) => option.type}
              onChange={(options) => {
                setState({
                  categoryTypes: options.map(({ type }) => type),
                });
              }}
            />
          )}
        </div>
      </Container>
      <ListLayout
        items={items}
        loading={infEquipmentsQuery.isLoading}
        keyAccessor={(item) => item.id}
        hasNext={infEquipmentsQuery.hasNextPage}
        fetchNext={infEquipmentsQuery.fetchNextPage}
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
    queryClient.prefetchQuery(
      equipmentKeys.equipmentCategories(),
      getEquipmentCategories
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Equipments;
