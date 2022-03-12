import React, { CSSProperties, ReactNode } from "react";
import cn from "classnames";

import Card from "@/components/Card";
import CardActions from "@/components/CardActions";
import CardContent from "@/components/CardContent";
import CardMedia from "@/components/CardMedia";
import H3 from "@/components/H3";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  style?: CSSProperties;
  title?: string;
  mediaSrc: string;
  desc?: string;
  renderActions?: () => ReactNode;
};

const HorizontalCard = ({
  className,
  style,
  title,
  mediaSrc,
  desc,
  renderActions,
}: Props) => {
  return (
    <Card className={cn(styles.horizontalCard, className)} style={style}>
      <CardMedia
        className={styles.media}
        src={mediaSrc}
        alt={title ?? desc ?? "horizontalCard"}
      />
      <div className={styles.info}>
        <CardContent className={styles.content}>
          {title && <H3>{title}</H3>}
          {desc && <p className={styles.desc}>{desc}</p>}
        </CardContent>
        {renderActions && (
          <CardActions className={styles.actions}>
            {renderActions()}
          </CardActions>
        )}
      </div>
    </Card>
  );
};

export default HorizontalCard;
