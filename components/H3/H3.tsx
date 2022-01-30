import React, { FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

const H3: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = ({ children, className, ...props }) => {
  return (
    <h3 className={cn(styles.h3, className)} {...props}>
      {children}
    </h3>
  );
};

export default H3;
