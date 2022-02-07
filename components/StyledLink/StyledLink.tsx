import React, { CSSProperties, FC } from "react";
import cn from "classnames";
import Link, { LinkProps } from "next/link";

import styles from "./styles.module.scss";

type Props = { className?: string; style?: CSSProperties; theme?: "primary" };

const StyledLink: FC<Props> = ({
  className,
  style,
  theme = "primary",
  children,
}) => {
  return (
    <a className={cn(className, styles.link, styles[theme])} style={style}>
      {children}
    </a>
  );
};

export default StyledLink;
