import { MouseEvent, SVGProps } from "react";
import cn from "classnames";

import { icons, IconType } from "./icons";

import styles from "./styles.module.scss";

export type IconSize = 6 | 8 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 48;

export interface IconProps {
  iconName: IconType;
  fill?: string;
  className?: string;
  classNameSvg?: string;
  rotate?: number;
  size?: IconSize;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

type NativeProps = Omit<SVGProps<SVGSVGElement>, keyof IconProps>;

const Icon = ({
  iconName,
  size = 16,
  className,
  classNameSvg,
  onClick,
  rotate = 0,
  fill,
  ...nativeProps
}: IconProps & NativeProps) => {
  const IconComponent = icons[iconName];

  if (!IconComponent) return null;

  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: onClick ? "pointer" : "inherit",
      }}
      className={cn(styles.iconWrapper, className)}
      onClick={onClick}
    >
      <IconComponent
        {...nativeProps}
        style={{ transform: `rotate(${rotate}deg)` }}
        width={size}
        height={size}
        className={classNameSvg}
        data-testid="svg-element"
      />
    </span>
  );
};

export default Icon;
