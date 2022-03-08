import { useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";
import { StrapiResponseWithPaging } from "types";

import keys from "./keys";
import { Equipment } from "./types";

type EquipmentResponse = StrapiResponseWithPaging<
  Equipment & { equipment_category: StrapiResponseWithPaging<{ name: string }> }
>;

export const getEquipment = async <T = EquipmentResponse>(id: string) => {
  const response = await fetch(
    createUrl(`/equipments/${id}`, {
      fields: ["name", "content", "params"],
      populate: {
        avatar: {
          fields: ["url"],
        },
        equipment_category: {
          fields: ["name"],
        },
      },
    }),
    {
      method: "get",
    }
  );

  return response.json() as Promise<T>;
};

export const useEquipmentQuery = <
  TQueryFnData = EquipmentResponse,
  TError = Error,
  TData = EquipmentResponse
>(
  id: string,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.equipment(id), {
    queryFn: () => getEquipment<TQueryFnData>(id),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
    ...options,
  });
};
