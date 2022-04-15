import React from "react";
import cn from "classnames";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import LogoSvg from "./Logo.svg";

import styles from "./styles.module.scss";

const Logo = ({ className }: { className?: string }) => {
  const router = useRouter();
  return router.pathname.includes("/home") ? (
    <LogoSvg className={cn(className, styles.logo)} />
  ) : (
    <Link href="/" passHref>
      <a className={cn(className, styles.logo)}>
        <LogoSvg />
      </a>
    </Link>
  );
};

export default Logo;
