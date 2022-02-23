import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";

export const getProjectCategories = async () => {
  const response = await fetch(
    createUrl("/project-categories", {
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

const useProjectCategoriesQuery = <
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
    keys.projectCategories,
    getProjectCategories,
    {
      ...options,
      staleTime: 1000 * 60 * 60 * 50,
    }
  );
};

export default useProjectCategoriesQuery;
