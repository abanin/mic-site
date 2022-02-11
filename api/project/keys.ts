const projectKeys = {
  allProjects: ["projects"] as const,
  infinity: (searchValue: string) => [
    ...projectKeys.allProjects,
    "infinity",
    searchValue,
  ],
  project: (id: string | number) =>
    [...projectKeys.allProjects, id.toString()] as const,
};

export default projectKeys;
