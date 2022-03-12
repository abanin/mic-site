import { StrapiResponseWithPaging } from "types";

export type Equipment = {
  name: string;
  category: any;
  content: string;
  params: string[];
  description: string;
  avatar: StrapiResponseWithPaging<{
    url: string;
  }>;
};
