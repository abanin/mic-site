import React, { CSSProperties, FC, ReactNode } from "react";
import cn from "classnames";
import Image from "next/image";

import styles from "./styles.module.scss";
import imageLoader from "helpers/imageLoader";

type Props = {
  className?: string;
  style?: CSSProperties;
  src: string;
  label?: ReactNode;
  ticker?: ReactNode;
};

const Asset: FC<Props> = ({ children, className, src, label, ticker }) => {
  return (
    <div className={cn(styles.asset, className)}>
      <div className={styles.image}>
        <Image
          loader={imageLoader}
          width={44}
          height={44}
          src={src}
          alt="asset"
        />
      </div>
      {children ? (
        children
      ) : label || ticker ? (
        <div className={styles.content}>
          {typeof label === "string" ? (
            <div className={styles.label}>{label}</div>
          ) : (
            label
          )}
          {typeof ticker === "string" ? (
            <div className={styles.ticker}>{ticker}</div>
          ) : (
            ticker
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Asset;
