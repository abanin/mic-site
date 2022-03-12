import { useInfiniteQuery } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";
import { Lab } from "./types";

export type LabsResponse = StrapiResponseArrayWithPaging<
  Pick<Lab, "name" | "description" | "previewImage">
>;

type Params = {
  page: number;
  pageSize?: number;
  requestParams?: {
    searchValue?: string;
  };
};

export const getInfiniteLabs = async <T = LabsResponse>(
  params: Params,
  selector?: (data: LabsResponse) => T
) => {
  const { page, pageSize = 4, requestParams = {} } = params;

  const response = await fetch(
    createUrl("/labs", {
      filters: {
        name: {
          $containsi: requestParams.searchValue,
        },
      },
      pagination: {
        page: page,
        pageSize: pageSize,
      },
      fields: ["name", "description"],
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
  const parsedJson: LabsResponse = await response.json();

  return selector ? selector(parsedJson) : parsedJson;
};

export const useInfiniteLabsQuery = (
  requestParams?: Params["requestParams"],
  pageSize?: number
) => {
  return useInfiniteQuery<LabsResponse, Error, LabsResponse>(
    keys.infinity(requestParams?.searchValue ?? ""),
    {
      queryFn: ({ pageParam = 1 }) => {
        return getInfiniteLabs({
          page: pageParam as number,
          pageSize,
          requestParams,
        });
      },
      staleTime: 1000 * 60 * 60,
      getNextPageParam: (lastPage) =>
        lastPage.meta.pagination.page === lastPage.meta.pagination.pageCount ||
        lastPage.meta.pagination.total === 0
          ? false
          : lastPage.meta.pagination.page + 1,
      getPreviousPageParam: (firstPage) =>
        firstPage.meta.pagination.page === 1
          ? false
          : firstPage.meta.pagination.page - 1,
    }
  );
};
