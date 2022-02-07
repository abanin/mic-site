import React from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Card from "@/components/Card";
import H3 from "@/components/H3";
import Section from "@/components/Section";
import Tabs from "@/components/Tabs";
import projectPng from "./project.png";

import styles from "./styles.module.scss";

const TABS = ["Завершённые", "В разработке", "Заявки на проекты"];

const PROJECTS = [
  {
    title: "Название проекта",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
  {
    title: "Название проекта1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
  {
    title: "Название проекта2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
  {
    title: "Название проекта3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
];

const Projects = () => {
  return (
    <Section
      title="Проекты"
      titleHref="/projects"
      desc="Идеи, которые воплощаются в жизнь"
      className={styles.projects}
    >
      <Tabs
        className={styles.tabs}
        tabs={TABS}
        defaultActiveTab={TABS[0]}
        keyAccessor={(tab) => tab}
        valueFormatter={(tab) => tab}
      />
      <div className={styles.cards}>
        {PROJECTS.map(({ title, desc, imgSrc }) => {
          return (
            <Card key={title} className={styles.card}>
              <Image src={imgSrc} alt={title} />
              <H3 className={styles.h3}>{title}</H3>
              <p className={styles.desc}>{desc}</p>
            </Card>
          );
        })}
      </div>
      <Button className={styles.btn}>Создать свой проект</Button>
    </Section>
  );
};

export default Projects;
