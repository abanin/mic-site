import React, { FC } from "react";
import cn from "classnames";
import imageLoader from "helpers/imageLoader";
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
      <Image loader={imageLoader} layout="fill" alt={alt} {...props} />
    </div>
  );
};

export default CardMedia;
