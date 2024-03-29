import React, { CSSProperties, ReactNode } from "react";
import { useMedia } from "react-use";
import cn from "classnames";
import imageLoader from "helpers/imageLoader";
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
  image?: string;
};

const MainLayout = ({
  title,
  btn,
  cardDesc,
  style,
  className,
  image,
}: Props) => {
  const isMobile = useMedia("(max-width: 768px)", false);
  return (
    <Container className={cn(className, styles.main)} style={style}>
      <H1>{title}</H1>
      {cardDesc && (
        <Card
          className={styles.card}
          style={{ backgroundImage: `url(/home/eventsPattern.svg)` }}
        >
          <p className={styles.desc}>{cardDesc}</p>
          {btn && <div className={styles.btn}>{btn}</div>}
          {!isMobile && (
            <div className={styles.imageWrapper}>
              <div className={styles.image}>
                <Image
                  loader={imageLoader}
                  layout="fill"
                  src={image ? image : QuadrocopterPng.src}
                  alt="quadro"
                />
              </div>
            </div>
          )}
        </Card>
      )}
    </Container>
  );
};

export default MainLayout;
