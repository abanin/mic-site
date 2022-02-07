import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { GetStaticProps } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import keys from "api/keys";
import projectKeys from "api/project/keys";
import { getProject } from "api/project/useProjectQuery";
import { getProjects } from "api/project/useProjectsQuery";
import { getFooter } from "api/useFooterQuery";
import Article from "./components/Article";
import Equipment from "./components/Equipment";

const Project = () => {
  return (
    <>
      <Header />
      <Article />
      <Equipment />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  {
    dehydratedState: ReturnType<typeof dehydrate>;
  },
  { slug: string }
> = async ({ params }) => {
  if (!params) throw new Error("slug must be not empty");

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(keys.footer, getFooter),
    queryClient.prefetchQuery(projectKeys.project(params.slug), () =>
      getProject(params.slug)
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export async function getStaticPaths() {
  const projects = await getProjects();

  const paths = projects.data.map((project) => ({
    params: {
      slug: project.attributes.Slug.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Project;
