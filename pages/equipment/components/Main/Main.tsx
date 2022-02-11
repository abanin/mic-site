import React from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import H1 from "@/components/H1";
import QuadrocopterPng from "../../../home/components/Events/quadro.png";

import styles from "./styles.module.scss";

const Main = () => {
  return (
    <main className={styles.main}>
      <Container>
        <H1>Оборудование МИЦ</H1>
        <Card
          className={styles.card}
          style={{ backgroundImage: `url(/home/eventsPattern.svg)` }}
        >
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
            porttitor sit nisi purus viverra in iaculis elementum. Euismod
            venenatis, at nisi tellus ipsum, libero, leo habitasse amet.
            Rhoncus, nulla ipsum a integer amet. Metus, nibh tellus ac at. Ac ac
            id consectetur elementum vel mauris. Nulla vulputate fermentum
            bibendum urna, at quis egestas sagittis dui.{" "}
          </p>
          <Button className={styles.btn}>Создать запрос на проект</Button>
          <div className={styles.image}>
            <Image
              width={210}
              height={119}
              src={QuadrocopterPng.src}
              alt="quadro"
            />
          </div>
        </Card>
      </Container>
    </main>
  );
};

export default Main;
