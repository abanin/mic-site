import React from "react";
import Image from "next/image";
import Link from "next/link";

import Arrow from "@/components/Arrow";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CardActions from "@/components/CardActions";
import CardContent from "@/components/CardContent";
import CardMedia from "@/components/CardMedia";
import Icon from "@/components/Icon";
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
            <Card key={title} className={styles.card}>
              <CardMedia
                layout="fill"
                variant="wide"
                src={imgSrc.src}
                alt="equipment"
              />
              <CardContent>
                <div className={styles.title}>Название оборудования</div>
                <p className={styles.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae quas totam officia nemo at doloremque, odit natus
                  consequatur cum nihil ab unde sunt laborum. Nesciunt doloribus
                  consequuntur optio repellat! Accusantium.
                </p>
                <CardActions>
                  <Link passHref href="#">
                    <Arrow right />
                  </Link>
                </CardActions>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Button className={styles.btn}>Смотреть всё оборудование</Button>
    </Section>
  );
};

export default Equipment;
