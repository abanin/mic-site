import React from "react";
import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArray } from "types";

import keys from "./keys";
import { Event } from "./types";

type EventResponse = StrapiResponseArray<Event, null>;

export const getEvent = async <T = EventResponse>(slug: string) => {
  const response = await fetch(
    createUrl(`/events`, {
      filter: {
        slug: {
          $eq: slug,
        },
      },
      fields: [
        "name",
        "date",
        "endDate",
        "content",
        "type",
        "slug",
        "inviteLink",
      ],
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

  return response.json() as Promise<T>;
};

const useEventQuery = <
  TQueryFnData = EventResponse,
  TError = Error,
  TData = EventResponse
>(
  slug: string,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(
    keys.event(slug),
    () => {
      return getEvent(slug);
    },
    { staleTime: 1000 * 60 * 60, ...options }
  );
};

export default useEventQuery;
