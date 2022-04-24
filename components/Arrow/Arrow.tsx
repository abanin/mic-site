import React, { forwardRef } from "react";
import cn from "classnames";

import Icon from "../Icon";

import styles from "./styles.module.scss";

type PartialProps =
  | {
      left: boolean;
      right?: never;
    }
  | {
      right: boolean;
      left?: never;
    };

type Props = {
  className?: string;
} & PartialProps;

const Arrow = forwardRef<HTMLDivElement, Props>(({ left, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(styles.arrow, className, left ? styles.left : styles.right)}
    />
  );
});

Arrow.displayName = "Arrow";

export default Arrow;
