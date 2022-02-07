import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";

export type Project = {
  status: "completed" | "WIP" | "order";
  name: string;
  description: string;
  content: string;
  Slug: string;
  previewImage: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
      };
    };
  };
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
      };
    };
  };
};

type ProjectResponse = StrapiResponseArrayWithPaging<Project>;

export const getProjects = async <T = ProjectResponse>(
  params: Record<string, unknown> = {}
) => {
  const response = await fetch(
    createUrl("/projects", {
      fields: ["status", "name", "description", "content", "slug", "Slug"],
      populate: {
        previewImage: {
          fields: ["url", "name"],
        },
        image: {
          fields: ["url", "name"],
        },
      },
      ...params,
    }),
    {
      method: "get",
    }
  );

  return (await response.json()) as Promise<T>;
};

export const useProjectsQuery = <
  TQueryFnData = ProjectResponse,
  TError = Error,
  TData = ProjectResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.allProjects, {
    queryFn: () => getProjects<TQueryFnData>(),
    staleTime: 1000 * 60 * 60,
    ...options,
  });
};
