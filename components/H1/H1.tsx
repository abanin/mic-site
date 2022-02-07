import React, { CSSProperties, FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  style?: CSSProperties;
};

const H1: FC<Props> = ({ className, children, style }) => {
  return (
    <h1 style={style} className={cn(styles.h1, className)}>
      {children}
    </h1>
  );
};

export default H1;
