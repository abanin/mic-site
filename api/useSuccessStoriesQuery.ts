import { QueryFunction, useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging, StrapiResponseWithPaging } from "types";

import keys from "./keys";

export type StoriesResponse = StrapiResponseArrayWithPaging<{
  name: string;
  position: string;
  content: string;
  avatar: StrapiResponseWithPaging<{
    url: string;
  }>;
}>;

export const getSuccessStories = async <T = StoriesResponse>() => {
  const response = await fetch(
    createUrl("/stories", {
      fields: ["name", "position", "content"],
      populate: {
        avatar: {
          fields: ["url"],
        },
      },
    }),
    {
      method: "get",
    }
  );

  return (await response.json()) as Promise<T>;
};

const useStoriesQuery = <
  TQueryFnData = StoriesResponse,
  TError = Error,
  TData = StoriesResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(
    keys.stories,
    () => getSuccessStories<TQueryFnData>(),
    {
      staleTime: 1000 * 60 * 60,
      ...options,
    }
  );
};

export default useStoriesQuery;
