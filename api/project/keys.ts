const projectKeys = {
  allProjects: ["projects"] as const,
  project: (id: string | number) =>
    [...projectKeys.allProjects, id.toString()] as const,
};

export default projectKeys;
