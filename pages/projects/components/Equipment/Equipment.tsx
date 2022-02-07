import React from "react";
import Link from "next/link";

import Arrow from "@/components/Arrow";
import Card from "@/components/Card";
import CardActions from "@/components/CardActions";
import CardContent from "@/components/CardContent";
import CardMedia from "@/components/CardMedia";
import H5 from "@/components/H5";
import Section from "@/components/Section";
import EquipImage from "./equipment.png";

import styles from "./styles.module.scss";

const EQUIPMENT = [
  {
    title: "Название оборудования",
    imgSrc: "#",
  },
  {
    title: "Название оборудования1",
    imgSrc: "#",
  },
  {
    title: "Название оборудования2",
    imgSrc: "#",
  },
  {
    title: "Название оборудования3",
    imgSrc: "#",
  },
];

const Equipment = () => {
  return (
    <Section title="Оборудование">
      <div className={styles.cards}>
        {EQUIPMENT.map(({ title, imgSrc }) => {
          return (
            <Card key={title}>
              <CardMedia
                variant="wide"
                layout="fill"
                src={EquipImage.src}
                alt="equipment"
              />
              <CardContent>
                <H5 style={{ textAlign: "center" }}>Название оборудования</H5>
                <p className={styles.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae quas totam officia nemo at doloremque, odit natus
                  consequatur cum nihil ab unde sunt laborum. Nesciunt doloribus
                  consequuntur optio repellat! Accusantium.
                </p>
                <CardActions>
                  <Link href="#">
                    <Arrow right />
                  </Link>
                </CardActions>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default Equipment;
