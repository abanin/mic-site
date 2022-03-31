import React, { FC } from "react";
import imageLoader from "helpers/imageLoader";
import Image from "next/image";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import H2 from "@/components/H2";

import styles from "./styles.module.scss";

type Props = {};

const Partners: FC<Props> = () => {
  return (
    <section className={styles.partners}>
      <Container>
        <Card className={styles.card}>
          <H2 className={styles.h2}>Партнёрам</H2>
          <p className={styles.desc}>
            Вы можете оставить заявку на разработку и реализацию проекта или
            детали на платформе МИЦ. Таким образом талантливые студенты получают
            практический бесценный опыт, а заказчик уникальный проект по цене
            ниже рыночной
          </p>
          <div className={styles.img}>
            <Image
              loader={imageLoader}
              width={250}
              height={240}
              src="/home/partners.svg"
              alt="partners"
            />
          </div>
          <Button className={styles.btn}>Создать запрос на проект</Button>
        </Card>
      </Container>
    </section>
  );
};

export default Partners;
