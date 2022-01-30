import React, { FC, ReactNode } from "react";
import cn from "classnames";

import Container from "../Container";
import H2 from "../H2";

import styles from "./styles.module.scss";

type Props = {
  title?: ReactNode;
  desc?: ReactNode;
};

const Section: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
    Props
> = ({ children, title, desc, className, ...props }) => {
  return (
    <section className={cn(styles.section, className)} {...props}>
      <Container>
        {typeof title === "string" ? <H2>{title}</H2> : title}
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
