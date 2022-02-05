import { QueryFunction, useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";

import keys from "./keys";

export type HomePageResponse = {
  data: {
    id: number;
    attributes: {
      pageTitle: string;
      pageDescription: string;
    };
  };
};

export const getHomePage = async () => {
  const response = await fetch(
    createUrl("/homepage", {
      fields: ["pageTitle", "pageDescription"],
    }),
    {
      method: "get",
    }
  );

  return await response.json();
};

const useHomePageQuery = <
  TQueryFnData = HomePageResponse,
  TError = Error,
  TData = HomePageResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.homePage, getHomePage, {
    ...options,
    staleTime: 1000 * 60 * 60,
  });
};

export default useHomePageQuery;
