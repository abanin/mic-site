import React, { FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

const H2: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = ({ children, className, ...props }) => {
  return (
    <h2 className={cn(className, styles.h2)} {...props}>
      {children}
    </h2>
  );
};

export default H2;
