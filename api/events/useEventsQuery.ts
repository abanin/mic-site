import { useInfiniteQuery, useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";
import { Event } from "./types";

export type EventsResponse = StrapiResponseArrayWithPaging<Event>;

export const getEvents = async <T = EventsResponse>() => {
  const response = await fetch(
    createUrl("/events", {
      fields: ["name", "date", "endDate", "content", "type", "slug"],
      populate: {
        image: {
          fields: ["url", "name"],
        },
      },
    }),
    {
      method: "get",
    }
  );
  const parsedJson: T = await response.json();

  return parsedJson;
};

export const useEventsQuery = <
  TQueryFnData = EventsResponse,
  TError = Error,
  TData = EventsResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(
    keys.all,
    () => {
      return getEvents<TQueryFnData>();
    },
    {
      staleTime: 1000 * 60 * 60,
      ...options,
    }
  );
};
