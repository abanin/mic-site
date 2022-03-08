import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseWithPaging } from "types";

import keys from "./keys";
import { Lab } from "./types";

type LabResponse = StrapiResponseWithPaging<Lab>;

export const getLab = async <T = LabResponse>(id: string | number) => {
  const response = await fetch(
    createUrl(`/labs/${id}`, {
      fields: ["name", "description", "content", "email", "phone"],
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

  return response.json() as Promise<T>;
};

export const useLabQuery = <
  TQueryFnData = LabResponse,
  TError = Error,
  TData = LabResponse
>(
  id: string | number,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.lab(id), {
    queryFn: () => getLab<TQueryFnData>(id),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
    ...options,
  });
};
