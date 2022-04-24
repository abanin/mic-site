import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";
import { Project } from "./types";

type ProjectResponse = StrapiResponseArrayWithPaging<Project>;

export const getProject = async <T = ProjectResponse>(slug: string) => {
  console.log(slug);
  const response = await fetch(
    createUrl("/projects", {
      filters: {
        Slug: {
          $eq: slug,
        },
      },
      fields: ["status", "name", "description", "content", "Slug"],
      populate: {
        previewImage: {
          fields: ["url", "name"],
        },
        image: {
          fields: ["url", "name"],
        },
      },
    }),
    {
      method: "get",
    }
  );

  return response.json() as Promise<T>;
};

export const useProjectQuery = <
  TQueryFnData = ProjectResponse,
  TError = Error,
  TData = ProjectResponse
>(
  slug: string,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.project(slug), {
    queryFn: () => getProject<TQueryFnData>(slug),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(slug),
    ...options,
  });
};
