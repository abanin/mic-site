import React, { FC, PropsWithChildren, ReactNode } from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";

import styles from "./styles.module.scss";

type Props<T> = {
  loading?: boolean;
  items: T[] | undefined | null;
  hasNext?: boolean;
  fetchNext: () => void;
  renderItem: (item: T) => ReactNode;
  renderSkeletonItem?: () => ReactNode;
  keyAccessor: (item: T) => string | number;
};

const ListLayout = <T,>({
  loading = false,
  renderItem,
  renderSkeletonItem,
  keyAccessor,
  fetchNext,
  hasNext,
  items,
}: PropsWithChildren<Props<T>>) => {
  return (
    <Container>
      {loading && renderSkeletonItem && (
        <ul className={styles.list}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <li key={idx}>{renderSkeletonItem()}</li>
          ))}
        </ul>
      )}

      {items && !loading && (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={keyAccessor(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      )}

      {hasNext && (
        <Button onClick={fetchNext} className={styles.btn}>
          Смотреть еще
        </Button>
      )}
    </Container>
  );
};

export default ListLayout;
