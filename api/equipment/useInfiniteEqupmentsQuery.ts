import { useInfiniteQuery } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";
import { Equipment } from "./types";

export type EquipmentResponse = StrapiResponseArrayWithPaging<Equipment>;

type Params = {
  page: number;
  pageSize?: number;
  requestParams?: {
    searchValue?: string;
    categoryTypes?: string[];
  };
};

export const getInfiniteEquipments = async <T = EquipmentResponse>(
  params: Params,
  selector?: (data: EquipmentResponse) => T
) => {
  const { page, pageSize = 8, requestParams = {} } = params;

  const response = await fetch(
    createUrl("/equipments", {
      filters: {
        name: {
          $containsi: requestParams.searchValue,
        },
        equipment_category: {
          type: {
            $in: requestParams.categoryTypes,
          },
        },
      },
      pagination: {
        page: page,
        pageSize: pageSize,
      },
      fields: ["name", "content", "params", "description"],
      populate: {
        equipment_category: {
          fields: ["name"],
        },
        avatar: {
          fields: ["url", "name"],
        },
      },
    }),
    {
      method: "get",
    }
  );
  const parsedJson: EquipmentResponse = await response.json();

  return selector ? selector(parsedJson) : parsedJson;
};

export const useInfiniteEquipmentsQuery = (
  requestParams?: Params["requestParams"]
) => {
  const stringifiedCategories =
    requestParams?.categoryTypes?.sort().join(",") ?? "";

  return useInfiniteQuery<EquipmentResponse, Error, EquipmentResponse>(
    keys.infinity(requestParams?.searchValue ?? "", stringifiedCategories),
    {
      queryFn: ({ pageParam = 1 }) => {
        return getInfiniteEquipments({
          page: pageParam as number,
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
