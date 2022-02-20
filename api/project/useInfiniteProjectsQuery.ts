import { useInfiniteQuery } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";
import { Project } from "./types";

export type ProjectResponse = StrapiResponseArrayWithPaging<Project>;

type Params = {
  page: number;
  pageSize?: number;
  requestParams?: {
    searchValue?: string;
    status?: "completed" | "WIP";
  };
};

export const getInfiniteProjects = async <T = ProjectResponse>(
  params: Params,
  selector?: (data: ProjectResponse) => T
) => {
  const { page, pageSize = 4, requestParams = {} } = params;

  const response = await fetch(
    createUrl("/projects", {
      filters: {
        name: {
          $containsi: requestParams.searchValue,
        },
        status: {
          $eq: requestParams.status,
        },
      },
      pagination: {
        page: page,
        pageSize: pageSize,
      },
      fields: ["status", "name", "description", "content", "slug", "Slug"],
      populate: {
        categories: "*",
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
  const parsedJson: ProjectResponse = await response.json();

  return selector ? selector(parsedJson) : parsedJson;
};

export const useInfiniteProjectsQuery = (
  requestParams?: Params["requestParams"]
) => {
  return useInfiniteQuery<ProjectResponse, Error, ProjectResponse>(
    keys.infinity(
      requestParams?.searchValue ?? "",
      requestParams?.status ?? "completed"
    ),
    {
      queryFn: ({ pageParam = 1 }) => {
        return getInfiniteProjects({
          page: pageParam as number,
          requestParams,
        });
      },
      staleTime: 1000 * 60 * 60,
      getNextPageParam: (lastPage) =>
        lastPage.meta.pagination.page === lastPage.meta.pagination.pageCount
          ? false
          : lastPage.meta.pagination.page + 1,
      getPreviousPageParam: (firstPage) =>
        firstPage.meta.pagination.page === 1
          ? false
          : firstPage.meta.pagination.page - 1,
    }
  );
};
