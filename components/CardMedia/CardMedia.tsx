import React, { FC } from "react";
import cn from "classnames";
import createImageUrl from "helpers/createImageUrl";
import imageLoader from "helpers/imageLoader";
import Image, { ImageProps } from "next/image";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  alt: string;
  aspect?: "3:4" | "16:9" | "1:1";
  src: string;
};

const CardMedia: FC<Props> = ({ className, alt, aspect, src }) => {
  const cls = cn(
    styles.cardMedia,
    className,
    aspect === "3:4" && styles["aspect-3-4"],
    aspect === "16:9" && styles["aspect-16-9"],
    aspect === "1:1" && styles["aspect-1-1"]
  );

  return (
    <div className={cls}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {src && <img className={styles.img} src={src} alt={alt} />}
      </div>
    </div>
  );
};

export default CardMedia;
