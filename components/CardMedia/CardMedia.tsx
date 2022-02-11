import React, { FC } from "react";
import cn from "classnames";
import Image, { ImageProps } from "next/image";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  alt: string;
} & ImageProps;

const CardMedia: FC<Props> = ({ className, alt, ...props }) => {
  const cls = cn(styles.cardMedia, className);
  return (
    <div className={cls}>
      <Image layout="fill" alt={alt} {...props} />
    </div>
  );
};

export default CardMedia;
