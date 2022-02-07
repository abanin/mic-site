import React, { FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

const CardActions: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className }) => {
  return <div className={cn(styles.cardActions, className)}>{children}</div>;
};

export default CardActions;
