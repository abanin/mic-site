import React, { useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import CardMedia from "@/components/CardMedia";
import Container from "@/components/Container";
import StyledLink from "@/components/StyledLink";
import Tabs from "@/components/Tabs";
import { Project, useProjectsQuery } from "api/project/useProjectsQuery";
import ProjectPng from "./project.png";

import styles from "./styles.module.scss";

const List = () => {
  const projectsQuery = useProjectsQuery({
    select: ({ data, meta }) => ({
      content: data.map((item) => item.attributes),
      pagination: meta.pagination,
    }),
  });

  return (
    <Container>
      <div className={styles.controls}>
        <input placeholder="Поиск по названию" className={styles.input} />
      </div>
      <ul className={styles.list}>
        {projectsQuery.isSuccess &&
          projectsQuery.data.content.map((project) => {
            return (
              <Link
                key={project.name}
                passHref
                href={`/projects/${project.Slug}`}
              >
                <StyledLink>
                  <Card style={{ cursor: "pointer" }}>
                    <CardMedia
                      layout="fill"
                      src={ProjectPng.src}
                      alt={project.name}
                    />
                    <CardContent>
                      <div className={styles.title}>{project.name}</div>
                      <p className={styles.desc}>{project.description}</p>
                    </CardContent>
                  </Card>
                </StyledLink>
              </Link>
            );
          })}
      </ul>

      <Button className={styles.btn}>Смотреть ещё</Button>
    </Container>
  );
};

export default List;
