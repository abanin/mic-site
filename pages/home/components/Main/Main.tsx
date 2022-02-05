import React from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Container from "@/components/Container";
import useHomePageQuery from "api/useHomePageQuery";

import styles from "./styles.module.scss";

const Main = () => {
  const homePageQuery = useHomePageQuery({
    select: ({ data }) => data.attributes,
  });

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        {homePageQuery.isSuccess && (
          <>
            <h1 className={styles.h1}>{homePageQuery.data.pageTitle}</h1>
            <p className={styles.desc}>{homePageQuery.data.pageDescription}</p>
            <Button className={styles.btn}>Стать частью центра</Button>
            <div className={styles.image}>
              <Image
                width={284}
                height={371}
                src="/home/mainImage.svg"
                alt="quadro"
              />
            </div>
          </>
        )}
      </Container>
    </main>
  );
};

export default Main;
