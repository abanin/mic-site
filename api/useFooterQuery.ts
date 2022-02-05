import { QueryFunction, useQuery, UseQueryOptions } from "react-query";
import createUrl from "helpers/createUrl";

import keys from "./keys";

export type FooterResponse = {
  data: {
    id: number;
    attributes: {
      footer: {
        id: string;
        socialLinks: {
          id: string;
          email: string;
          phone: string;
          telegram: string;
          vk: string;
          instagram: string;
        };
        implementedProjectsCount: number;
        peopleCompletedCoursesNumber: number;
        peopleInvolvedInProjectsNumber: number;
        address: string;
      };
    };
  };
};

export const getFooter = async () => {
  const response = await fetch(
    createUrl("/homepage", {
      fields: ["pageTitle"],
      populate: {
        footer: {
          populate: "socialLinks",
        },
      },
    }),
    {
      method: "get",
    }
  );

  return await response.json();
};

const useFooterQuery = <
  TQueryFnData = FooterResponse,
  TError = Error,
  TData = FooterResponse
>(
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TQueryFnData, TError, TData>(keys.footer, getFooter, {
    ...options,
    staleTime: 1000 * 60 * 60,
  });
};

export default useFooterQuery;
