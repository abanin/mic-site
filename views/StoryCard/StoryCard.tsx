import React from "react";
import cn from "classnames";
import createImageUrl from "helpers/createImageUrl";

import Card from "@/components/Card";
import H5 from "@/components/H5";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  image?: string;
  topTitle?: string | null;
  bottomTitle?: string | null;
};

const StoryCard = ({ className, topTitle, bottomTitle, image }: Props) => {
  return (
    <Card
      className={cn(styles.card, className)}
      style={image ? { backgroundImage: `url(${createImageUrl(image)})` } : {}}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        {topTitle && (
          <H5 className={cn(styles.topTitle, styles.title)}>{topTitle}</H5>
        )}
        {bottomTitle && (
          <H5 className={cn(styles.bottomTitle, styles.title)}>
            {bottomTitle}
          </H5>
        )}
      </div>
    </Card>
  );
};

export default StoryCard;
