import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseArrayWithPaging } from "types";

import keys from "./keys";
import { Equipment } from "./types";

type EquipmentResponse = StrapiResponseArrayWithPaging<Equipment>;

export const getEquipments = async <T = EquipmentResponse>(
  params: Record<string, unknown> = {}
) => {
  const response = await fetch(
    createUrl("/equipments", {
      fields: ["name", "content", "params"],
      ...params,
    }),
    {
      method: "get",
    }
  );

  return (await response.json()) as Promise<T>;
};

export const useEquipmentsQuery = <
  TQueryFnData = EquipmentResponse,
  TError = Error,
  TData = EquipmentResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.all, {
    queryFn: () => getEquipments<TQueryFnData>(),
    staleTime: 1000 * 60 * 60,
    ...options,
  });
};
