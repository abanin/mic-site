import React, { CSSProperties, FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

const CardContent: FC<{
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn(styles.cardContent, className)}>{children}</div>;
};

export default CardContent;
