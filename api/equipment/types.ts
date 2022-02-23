import { StrapiResponseWithPaging } from "types";

export type Equipment = {
  name: string;
  category: any;
  content: string;
  params: string[];
  avatar: StrapiResponseWithPaging<{
    url: string;
  }>;
};
