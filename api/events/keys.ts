const eventKeys = {
  all: ["events"],
  event: (slug: string) => [...eventKeys.all, slug.toString()] as const,
};

export default eventKeys;
