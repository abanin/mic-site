import React from "react";
import cn from "classnames";
import Image, { ImageProps } from "next/image";

import LogoSvg from "./Logo.svg";

import styles from "./styles.module.scss";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, styles.logo)}>
      <LogoSvg />
    </div>
  );
};

export default Logo;
