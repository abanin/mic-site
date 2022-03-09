import { StrapiResponse } from "types";

export type Event = {
  name: string;
  type: "event" | "olympicOrConference" | "competition" | "educationProgram";
  content: string;
  date: null | string;
  slug: string;
  endDate: null | string;
  image: StrapiResponse<{ url: string; name: string }, null>;
};
