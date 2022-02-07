import React from "react";
import Link from "next/link";

import Arrow from "@/components/Arrow";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CardActions from "@/components/CardActions";
import CardContent from "@/components/CardContent";
import CardMedia from "@/components/CardMedia";
import Container from "@/components/Container";
import H5 from "@/components/H5";
import ProjectPng from "./project.png";

import styles from "./styles.module.scss";

type Lab = {
  id: number;
  title: string;
  desc: string;
  status: "completed" | "WIP" | "orders";
  imgSrc: "#";
  categoryIds: string[];
};

const LABS: Lab[] = [
  {
    id: 1,
    status: "completed",
    title: "Название Лаборатории",
    imgSrc: "#",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    categoryIds: ["1"],
  },
  {
    id: 2,
    status: "WIP",
    title: "Название Лаборатории",
    imgSrc: "#",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    categoryIds: ["1"],
  },
  {
    id: 2,
    status: "orders",
    title: "Название Лаборатории",
    imgSrc: "#",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    categoryIds: ["1"],
  },
];

const List = () => {
  return (
    <Container style={{ paddingBottom: 90 }}>
      <div className={styles.controls}>
        <input placeholder="Поиск по названию" className={styles.input} />
      </div>
      <ul className={styles.list}>
        {LABS.map((lab) => {
          return (
            <Link key={lab.id} passHref href="/labs/1">
              <Card>
                <CardMedia
                  variant="wide"
                  layout="fill"
                  src={ProjectPng.src}
                  alt="equipment"
                />
                <CardContent>
                  <H5 style={{ textAlign: "center" }}>Название оборудования</H5>
                  <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae quas totam officia nemo at doloremque, odit natus
                    consequatur cum nihil ab unde sunt laborum. Nesciunt
                    doloribus consequuntur optio repellat! Accusantium.
                  </p>
                  <CardActions>
                    <Link passHref href="#">
                      <Arrow right />
                    </Link>
                  </CardActions>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </ul>
      {LABS.length > 8 && <Button className={styles.btn}>Смотреть ещё</Button>}
    </Container>
  );
};

export default List;
