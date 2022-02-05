import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import qs from "qs";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Projects: NextPage = () => {
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
    </>
  );
};

export default Projects;
