import React, { FC } from "react";
import cn from "classnames";
import Image, { ImageProps } from "next/image";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  variant?: "normal" | "wide";
  alt: string;
} & ImageProps;

const CardMedia: FC<Props> = ({
  className,
  alt,
  variant = "normal",
  ...props
}) => {
  const cls = cn(styles.cardMedia, className, styles[variant]);
  return (
    <div className={cls}>
      <Image alt={alt} {...props} />
    </div>
  );
};

export default CardMedia;
