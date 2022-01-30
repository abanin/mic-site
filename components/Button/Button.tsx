import React, { FC } from "react";
import { Oval } from "react-loader-spinner";
import cn from "classnames";

import Icon, { IconType } from "../Icon";

import styles from "./styles.module.scss";

type CustomProps = {
  iconClassName?: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  iconName?: IconType;
};

type NativeProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  keyof CustomProps
>;

export type Props = CustomProps & NativeProps;

const Button: FC<Props> = ({
  className,
  iconClassName,
  loading = false,
  variant = "primary",
  disabled = false,
  iconName,
  children,
  ...props
}) => {
  const cls = cn(
    styles.btn,
    (disabled || loading) && styles.disabled,
    styles[variant],
    className
  );
  return (
    <button disabled={disabled} className={cls} {...props}>
      {loading && (
        <div className={styles.loading}>
          <Oval color="#fff" height={24} width={24} />
        </div>
      )}
      {children}
      {iconName && (
        <Icon className={cn(iconClassName, styles.icon)} iconName={iconName} />
      )}
    </button>
  );
};

export default Button;
