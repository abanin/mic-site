import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = ({ className, ...props }: Props) => {
  return <input className={cn(className, styles.input)} {...props} />;
};

export default Input;
