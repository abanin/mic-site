import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";

export type Project = {
  status: "completed" | "WIP" | "order";
  name: string;
  description: string;
  content: string;
  Slug: null | string;
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

export const getProject = async <T = ProjectResponse>(slug: string) => {
  const response = await fetch(
    createUrl("/projects", {
      filter: {
        slug: {
          $eq: slug,
        },
      },
      fields: ["status", "name", "description", "content", "slug", "Slug"],
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

  return (await response.json()) as Promise<T>;
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
