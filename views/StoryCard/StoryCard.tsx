import React from "react";
import cn from "classnames";

import Card from "@/components/Card";
import H5 from "@/components/H5";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  topTitle: string;
  bottomTitle: string;
};

const StoryCard = ({ className, topTitle, bottomTitle }: Props) => {
  return (
    <Card className={cn(styles.card, className)}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <H5 className={cn(styles.topTitle, styles.title)}>{topTitle}</H5>
        <H5 className={cn(styles.bottomTitle, styles.title)}>{bottomTitle}</H5>
      </div>
    </Card>
  );
};

export default StoryCard;
