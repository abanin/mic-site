import React, { FC } from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";

import styles from "./styles.module.scss";

type Props = {};

const Partners: FC<Props> = () => {
  return (
    <Section title="Партнёрам" className={styles.partners}>
      <Card className={styles.card}>
        <p className={styles.desc}>
          Вы можете оставить заявку на разработку и реализацию проекта или
          детали на платформе МИЦ. Таким образом талантливые студенты получают
          практический бесценный опыт, а заказчик уникальный проект по цене ниже
          рыночной
        </p>
        <Button className={styles.btn}>Создать запрос на проект</Button>
        <div className={styles.img}>
          <Image
            width={250}
            height={240}
            src="/home/partners.svg"
            alt="partners"
          />
        </div>
      </Card>
    </Section>
  );
};

export default Partners;
