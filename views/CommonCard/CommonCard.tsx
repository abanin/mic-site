import React, { CSSProperties, FC } from "react";
import cn from "classnames";

import Card from "@/components/Card";
import CardActions from "@/components/CardActions";
import CardContent from "@/components/CardContent";
import CardMedia from "@/components/CardMedia";
import H3 from "@/components/H3";
import LineClamp from "@/components/LineClamp";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  style?: CSSProperties;
  title: string;
  mediaSrc: string;
  desc: string;
  textOverflow?: CSSProperties["textOverflow"];
};

const CommonCard: FC<Props> = ({
  className,
  style,
  mediaSrc = "",
  title,
  desc,
  children,
  textOverflow = "initial",
}) => {
  return (
    <Card style={style} className={cn(className, styles.card)}>
      <CardMedia src={mediaSrc} alt={title} />
      <CardContent className={styles.content}>
        <LineClamp height="2.8em" lineClamp={2}>
          <H3>{title}</H3>
        </LineClamp>
        {desc && (
          <LineClamp>
            <p className={styles.desc}>{desc}</p>
          </LineClamp>
        )}
      </CardContent>
      {children && <CardActions>{children}</CardActions>}
    </Card>
  );
};

export default CommonCard;
