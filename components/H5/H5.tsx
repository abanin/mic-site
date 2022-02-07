import React, { FC } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

const H5: FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
> = ({ children, className, ...props }) => {
  return (
    <h5 className={cn(className, styles.h5)} {...props}>
      {children}
    </h5>
  );
};

export default H5;
