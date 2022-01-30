import React from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";
import EquipmentPng from "./equipment.png";

import styles from "./styles.module.scss";

const EQUIPMENT = [
  {
    title: "Название оборудования",
    imgSrc: EquipmentPng,
  },
  {
    title: "Название оборудования1",
    imgSrc: EquipmentPng,
  },
  {
    title: "Название оборудования2",
    imgSrc: EquipmentPng,
  },
  {
    title: "Название оборудования3",
    imgSrc: EquipmentPng,
  },
];

const Equipment = () => {
  return (
    <Section
      title="Оборудование"
      desc="Мы предоставим все необходимые инструменты для реализации твоих идей"
      className={styles.equipment}
    >
      <div className={styles.cards}>
        {EQUIPMENT.map(({ title, imgSrc }) => {
          return (
            <Card
              key={title}
              className={styles.card}
              style={{ background: `url(${imgSrc.src}) center no-repeat` }}
            >
              <div className={styles.panel}>{title}</div>
            </Card>
          );
        })}
      </div>
      <Button className={styles.btn}>Смотреть всё оборудование</Button>
    </Section>
  );
};

export default Equipment;
