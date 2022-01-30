import React from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Container from "@/components/Container";

import styles from "./styles.module.scss";

const Main = () => {
  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <h1 className={styles.h1}>Молодежный инженерный центр</h1>
        <p className={styles.desc}>
          Убираем барьеры на пути создателей новых технологий и продуктов,
          отвечающих вызовам современного мира
        </p>
        <Button className={styles.btn}>Стать частью центра</Button>
        <div className={styles.image}>
          <Image
            width={284}
            height={371}
            src="/home/mainImage.svg"
            alt="quadro"
          />
        </div>
      </Container>
    </main>
  );
};

export default Main;
