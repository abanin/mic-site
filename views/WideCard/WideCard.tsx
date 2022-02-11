import React from "react";
import cn from "classnames";

import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import H3 from "@/components/H3";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  title: string;
  imageSrc: string;
  desc: string;
};

const WideCard = ({ className, title, imageSrc, desc }: Props) => {
  return (
    <Card
      className={cn(className, styles.card)}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={styles.overlay} />
      <CardContent className={styles.content}>
        <H3 className={styles.h3}>{title}</H3>
        {desc && <p className={styles.desc}>{desc}</p>}
      </CardContent>
    </Card>
  );
};

export default WideCard;
