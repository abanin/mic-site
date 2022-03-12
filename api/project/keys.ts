const projectKeys = {
  allProjects: ["projects"] as const,
  infinity: (
    searchValue: string,
    status: "completed" | "WIP",
    categoryType: string[]
  ) => [
    ...projectKeys.allProjects,
    "infinity",
    searchValue,
    status,
    categoryType.toString(),
  ],
  project: (id: string | number) =>
    [...projectKeys.allProjects, id.toString()] as const,
};

export default projectKeys;
