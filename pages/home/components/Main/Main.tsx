import React from "react";
import imageLoader from "helpers/imageLoader";
import Image from "next/image";

import Button from "@/components/Button";
import Container from "@/components/Container";
import H1 from "@/components/H1";
import useHomePageQuery from "api/useHomePageQuery";
import useLinksQuery from "api/useLinksQuery";

import styles from "./styles.module.scss";

const Main = () => {
  const homePageQuery = useHomePageQuery({
    select: ({ data }) => data.attributes,
  });

  const linksQuery = useLinksQuery({
    select: ({ data }) => data.attributes,
  });

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        {homePageQuery.isSuccess && linksQuery.isSuccess && (
          <>
            <H1 className={styles.h1}>{homePageQuery.data.pageTitle}</H1>
            <p className={styles.desc}>{homePageQuery.data.pageDescription}</p>
            {linksQuery.data.joinMIC && (
              <a
                target="_blank"
                href={linksQuery.data.joinMIC}
                rel="noreferrer"
              >
                <Button className={styles.btn}>Стать частью центра</Button>
              </a>
            )}

            <div className={styles.image}>
              <Image
                loader={imageLoader}
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
