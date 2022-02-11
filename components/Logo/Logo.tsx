import React from "react";
import cn from "classnames";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import LogoSvg from "./Logo.svg";

import styles from "./styles.module.scss";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" passHref>
      <a className={cn(className, styles.logo)}>
        <LogoSvg />
      </a>
    </Link>
  );
};

export default Logo;
