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

const TABS: { label: string; value: Project["status"] }[] = [
  { label: "Завершённые", value: "completed" },
  { label: "В разработке", value: "WIP" },
  { label: "Заявки на проекты", value: "order" },
];
const accessor = (tab: typeof TABS[number]) => tab.value;

const List = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const projectsQuery = useProjectsQuery({
    select: ({ data, meta }) => ({
      content: data.map((item) => item.attributes),
      pagination: meta.pagination,
    }),
  });

  console.log(projectsQuery);

  return (
    <Container>
      <Tabs
        activeTab={activeTab}
        tabs={TABS}
        onClick={(tab) => setActiveTab(tab)}
        keyAccessor={accessor}
        valueFormatter={(tab) => tab.label}
      />
      <div className={styles.controls}>
        <input placeholder="Поиск по названию" className={styles.input} />
      </div>
      <ul className={styles.list}>
        {projectsQuery.isSuccess &&
          projectsQuery.data.content
            .filter(({ status }) => status === activeTab.value)
            .map((project) => {
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
