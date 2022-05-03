import { StrapiResponse } from "types";

export type Lab = {
  name: string;
  description: string;
  content: string;
  email?: string;
  phone?: string;
  previewImage: StrapiResponse<{ url: string; name: string }, {}>;
  image: StrapiResponse<{ url: string; name: string }, {}>;
};
