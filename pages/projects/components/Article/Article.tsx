import React, { FC } from "react";
import { WithRouterProps } from "next/dist/client/with-router";
import Image from "next/image";
import { withRouter } from "next/router";

import Button from "@/components/Button";
import Container from "@/components/Container";
import H1 from "@/components/H1";
import { useProjectQuery } from "api/project/useProjectQuery";
import ImagePng from "./image.png";

import styles from "./styles.module.scss";

const Article: FC<WithRouterProps> = ({ router }) => {
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";
  const projectQuery = useProjectQuery(slug, {
    select: ({ data }) => data[0].attributes,
  });

  console.log(projectQuery);

  return (
    <Container className={styles.article}>
      {projectQuery.isSuccess && (
        <>
          <div className={styles.sidebar}>
            <Image height={270} width={270} src={ImagePng.src} alt="project" />
            <Button className={styles.btn}>Создать свой проект</Button>
          </div>
          <div className={styles.post}>
            <H1>{projectQuery.data.name}</H1>
            <span className={styles.category}>Категория проекта</span>
            <div className={styles.content}>{projectQuery.data.content}</div>
          </div>
        </>
      )}
    </Container>
  );
};

export default withRouter(Article);
