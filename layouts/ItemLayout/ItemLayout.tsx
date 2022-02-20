import React, { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import cn from "classnames";
import Image from "next/image";

import Container from "@/components/Container";
import H1 from "@/components/H1";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  title: string;
  content: string;
  desc?: ReactNode;

  mainImageSrc: string;

  renderActions?: () => ReactNode;
};

const ItemLayout: FC<Props> = ({
  className,
  title,
  content,
  desc,
  mainImageSrc,
  renderActions,
  children,
}) => {
  return (
    <>
      <Container className={cn(styles.itemPage, className)}>
        <div className={styles.info}>
          <div className={styles.image}>
            <Image layout="fill" src={mainImageSrc} alt={title} />
          </div>
          {renderActions && (
            <div className={styles.actions}>{renderActions()}</div>
          )}
        </div>
        <div className={styles.contentWrapper}>
          <H1>{title}</H1>
          {typeof desc === "string" ? (
            <span className={styles.desc}>{desc}</span>
          ) : (
            desc
          )}
          <div className={styles.content}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </Container>
      {children}
    </>
  );
};

export default ItemLayout;
