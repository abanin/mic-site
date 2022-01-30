import React, { CSSProperties, FC } from "react";
import cn from "classnames";
import Link, { LinkProps } from "next/link";

import styles from "./styles.module.scss";

type Props = { className?: string; style?: CSSProperties } & LinkProps;

const StyledLink: FC<Props> = ({ className, style, href, children }) => {
  return (
    <Link href={href}>
      <a className={cn(className, styles.link)} style={style}>
        {children}
      </a>
    </Link>
  );
};

export default StyledLink;
