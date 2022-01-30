import React from "react";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Contacts from "./components/Contacts";
import Equipment from "./components/Equipment";
import Events from "./components/Events";
import Labs from "./components/Labs";
import Main from "./components/Main";
import Partners from "./components/Partners";
import Projects from "./components/Projects";
import Students from "./components/Students";

const Home = () => {
  return (
    <>
      <Head>
        <title>МИЦ</title>
        <meta
          name="description"
          content="Убираем барьеры на пути создателей новых технологий и продуктов, отвечающих вызовам современного мира 
"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Projects />
      <Partners />
      <Equipment />
      <Students />
      <Labs />
      <Events />
      <Contacts />
      <Footer />
    </>
  );
};

export default Home;
