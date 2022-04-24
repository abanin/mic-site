import React, { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { useMedia } from "react-use";
import cn from "classnames";
import createImageUrl from "helpers/createImageUrl";
import imageLoader from "helpers/imageLoader";
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
  const isMobile = useMedia("(max-width: 768px)", false);

  return (
    <>
      <Container className={cn(styles.itemPage, className)}>
        <div className={styles.info}>
          <div className={styles.image}>
            <Image
              loader={imageLoader}
              layout="fill"
              src={mainImageSrc}
              alt={title}
            />
          </div>
          {!isMobile && renderActions && (
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
            <ReactMarkdown transformImageUri={(src) => createImageUrl(src)}>
              {content}
            </ReactMarkdown>
          </div>
          {children}
          {isMobile && renderActions && (
            <div className={styles.actions}>{renderActions()}</div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ItemLayout;
