import React from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";
import LabPng from "./lab.png";

import styles from "./styles.module.scss";

const LABS = [
  {
    title: "Название лаборатории",
    href: LabPng,
  },
  {
    title: "Название лаборатории1",
    href: LabPng,
  },
  {
    title: "Название лаборатории2",
    href: LabPng,
  },
  {
    title: "Название лаборатории3",
    href: LabPng,
  },
];

const Labs = () => {
  return (
    <Section
      title="Лаборатории"
      desc="Наши партнеры, открывающие больше возможностей"
      className={styles.labs}
    >
      <div className={styles.labList}>
        {LABS.map(({ title, href }) => {
          return (
            <Card
              className={styles.lab}
              key={title}
              style={{ background: `url(${href.src}) center no-repeat` }}
            >
              <div className={styles.panel}>{title}</div>
            </Card>
          );
        })}
      </div>
      <Button className={styles.btn}>Смотреть все лаборатории</Button>
    </Section>
  );
};

export default Labs;
