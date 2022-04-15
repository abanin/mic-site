import React from "react";
import { dehydrate, QueryClient } from "react-query";
import createImageUrl from "helpers/createImageUrl";
import ItemLayout from "layouts/ItemLayout";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import keys from "api/keys";
import projectKeys from "api/project/keys";
import { getProject, useProjectQuery } from "api/project/useProjectQuery";
import { getProjects } from "api/project/useProjectsQuery";
import { getFooter } from "api/useFooterQuery";
import ImagePng from "./image.png";

const Project = () => {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";
  const projectQuery = useProjectQuery(slug, {
    select: ({ data }) => data[0].attributes,
  });

  if (!projectQuery.isSuccess) return null;

  return (
    <>
      <Header />
      <ItemLayout
        title={projectQuery.data.name}
        desc={projectQuery.data.description}
        mainImageSrc={createImageUrl(
          projectQuery.data.image.data.attributes.url
        )}
        content={projectQuery.data.content}
      />
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
