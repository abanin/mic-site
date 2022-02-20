import React, { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import Card from "@/components/Card";
import Container from "@/components/Container";
import H1 from "@/components/H1";
import QuadrocopterPng from "../../pages/home/components/Events/quadro.png";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  style?: CSSProperties;
  title: string;
  cardDesc?: string;
  btn?: ReactNode;
};

const MainLayout = ({ title, btn, cardDesc, style, className }: Props) => {
  return (
    <Container className={className} style={style}>
      <H1>{title}</H1>
      {cardDesc && (
        <Card
          className={styles.card}
          style={{ backgroundImage: `url(/home/eventsPattern.svg)` }}
        >
          <p className={styles.desc}>{cardDesc}</p>
          {btn && <div className={styles.btn}>{btn}</div>}
          <div className={styles.image}>
            <Image
              width={210}
              height={119}
              src={QuadrocopterPng.src}
              alt="quadro"
            />
          </div>
        </Card>
      )}
    </Container>
  );
};

export default MainLayout;
