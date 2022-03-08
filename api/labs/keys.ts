const labsKeys = {
  allLabs: ["labs"] as const,
  infinity: (searchValue: string) => [
    ...labsKeys.allLabs,
    "infinity",
    searchValue,
  ],
  lab: (id: string | number) => [...labsKeys.allLabs, id.toString()] as const,
};

export default labsKeys;
