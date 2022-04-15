import { QueryFunction, useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";

import keys from "./keys";

export type LinksResponse = {
  data: {
    id: number;
    attributes: {
      joinMIC: string;
      requestProject: string;
      createProject: string;
    };
  };
};

export const getLinks = async () => {
  const response = await fetch(
    createUrl("/link", {
      fields: ["joinMIC", "createProject", "requestProject"],
    }),
    {
      method: "get",
    }
  );

  return await response.json();
};

const useLinksQuery = <
  TQueryFnData = LinksResponse,
  TError = Error,
  TData = LinksResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.links, getLinks, {
    ...options,
    staleTime: 1000 * 60 * 60,
  });
};

export default useLinksQuery;
