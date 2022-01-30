import React, { FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

const Card: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div className={cn(styles.card, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
