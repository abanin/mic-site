const projectKeys = {
  allProjects: ["projects"] as const,
  infinity: (searchValue: string, status: "completed" | "WIP") => [
    ...projectKeys.allProjects,
    "infinity",
    searchValue,
    status,
  ],
  project: (id: string | number) =>
    [...projectKeys.allProjects, id.toString()] as const,
};

export default projectKeys;
