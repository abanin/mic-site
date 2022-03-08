import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";

export const getEquipmentCategories = async () => {
  const response = await fetch(
    createUrl("/equipment-categories", {
      fields: ["name", "type"],
    }),
    {
      method: "get",
    }
  );

  return await response.json();
};

type ProjectCategoriesResponse = StrapiResponseArrayWithPaging<{
  name: string;
  type: string;
}>;

const useEquipmentCategoriesQuery = <
  TQueryFnData = ProjectCategoriesResponse,
  TError = Error,
  TData = ProjectCategoriesResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(
    keys.equipmentCategories(),
    getEquipmentCategories,
    {
      ...options,
      staleTime: 1000 * 60 * 60 * 50,
    }
  );
};

export default useEquipmentCategoriesQuery;
