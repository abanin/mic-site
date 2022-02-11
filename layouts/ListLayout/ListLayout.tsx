import React, { FC, PropsWithChildren, ReactNode } from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";

import styles from "./styles.module.scss";

type Props<T> = {
  items: T[] | undefined | null;
  hasNext?: boolean;
  fetchNext: () => void;
  renderItem: (item: T) => ReactNode;
  keyAccessor: (item: T) => string | number;
};

const ListLayout = <T,>({
  renderItem,
  keyAccessor,
  fetchNext,
  hasNext,
  items,
}: PropsWithChildren<Props<T>>) => {
  return (
    <Container>
      {items && (
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
