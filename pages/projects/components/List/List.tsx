import React, { useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import CardMedia from "@/components/CardMedia";
import Container from "@/components/Container";
import Tabs from "@/components/Tabs";
import ProjectPng from "./project.png";

import styles from "./styles.module.scss";

type Project = {
  id: number;
  title: string;
  desc: string;
  status: "completed" | "WIP" | "orders";
  imgSrc: "#";
  categoryIds: string[];
};

const TABS: { label: string; value: Project["status"] }[] = [
  { label: "Завершённые", value: "completed" },
  { label: "В разработке", value: "WIP" },
  { label: "Заявки на проекты", value: "orders" },
];
const accessor = (tab: typeof TABS[number]) => tab.value;

const PROJECTS: Project[] = [
  {
    id: 1,
    status: "completed",
    title: "Название проекта Completed",
    imgSrc: "#",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    categoryIds: ["1"],
  },
  {
    id: 2,
    status: "WIP",
    title: "Название проекта WIP",
    imgSrc: "#",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    categoryIds: ["1"],
  },
  {
    id: 2,
    status: "orders",
    title: "Название проекта Orders",
    imgSrc: "#",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    categoryIds: ["1"],
  },
];

const List = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <Container>
      <Tabs
        activeTab={activeTab}
        tabs={TABS}
        onClick={(tab) => setActiveTab(tab)}
        keyAccessor={accessor}
        valueFormatter={(tab) => tab.label}
      />
      <div className={styles.controls}>
        <input placeholder="Поиск по названию" className={styles.input} />
      </div>
      <ul className={styles.list}>
        {PROJECTS.filter(({ status }) => status === activeTab.value).map(
          (project) => {
            return (
              <Link key={project.id} passHref href="/projects/1">
                <Card style={{ cursor: "pointer" }}>
                  <CardMedia
                    layout="fill"
                    src={ProjectPng.src}
                    alt={project.title}
                  />
                  <CardContent>
                    <div className={styles.title}>{project.title}</div>
                    <p className={styles.desc}>{project.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          }
        )}
      </ul>

      <Button className={styles.btn}>Смотреть ещё</Button>
    </Container>
  );
};

export default List;
