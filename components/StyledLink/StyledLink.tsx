import React, { CSSProperties, FC, forwardRef, PropsWithChildren } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  theme?: "primary";
  href?: string;
}>;

const StyledLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, style, theme = "primary", children, href }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(className, styles.link, styles[theme])}
        style={style}
        href={href}
      >
        {children}
      </a>
    );
  }
);

StyledLink.displayName = "StyledLink";

export default StyledLink;
