import React, { FC, ReactNode } from "react";
import cn from "classnames";
import Link from "next/link";

import Container from "../Container";
import H2 from "../H2";
import StyledLink from "../StyledLink";

import styles from "./styles.module.scss";

type Props = {
  title?: ReactNode;
  desc?: ReactNode;
  titleHref?: string;
};

const Section: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
    Props
> = ({ children, titleHref, title, desc, className, ...props }) => {
  const wrapIntoLink = (element: ReactNode) => {
    if (titleHref) {
      return (
        <Link passHref href={titleHref}>
          <StyledLink className={styles.link}>{element}</StyledLink>
        </Link>
      );
    }

    return element;
  };

  return (
    <section className={cn(styles.section, className)} {...props}>
      <Container className={styles.container}>
        {wrapIntoLink(
          typeof title === "string" ? (
            <H2 className={styles.h2}>{title}</H2>
          ) : (
            title
          )
        )}
        {typeof desc === "string" ? (
          <p className={styles.desc}>{desc}</p>
        ) : (
          desc
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
