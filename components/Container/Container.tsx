import React, { CSSProperties, FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
  style?: CSSProperties;
  className?: string;
};

const Container: FC<Props> = ({ children, style, className }) => {
  return (
    <div className={cn(className, styles.container)} style={style}>
      {children}
    </div>
  );
};

export default Container;
