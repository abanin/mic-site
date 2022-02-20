import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import H1 from "@/components/H1";
import StyledLink from "@/components/StyledLink";

import styles from "./styles.module.scss";

type Props = {
  title: string;
  desc: ReactNode;
  href?: string;
  textHref?: string;
};

const ErrorLayout = ({
  title,
  desc,
  href = "/home",
  textHref = "На главную",
}: Props) => {
  return (
    <Container className={styles.container}>
      <div className={styles.content}>
        <H1>{title}</H1>
        <p className={styles.desc}>{desc}</p>
        <Link href={href} passHref>
          <StyledLink>{textHref}</StyledLink>
        </Link>
      </div>

      <div className={styles.imageWrapper}>
        <Image layout="fill" src="/404.svg" alt="404 error" />
      </div>
    </Container>
  );
};

export default ErrorLayout;
