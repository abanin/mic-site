const equipmentKeys = {
  all: ["equipments"] as const,
  equipment: (id: string | number) => [...equipmentKeys.all, id.toString()],
  infinity: (searchValue: string) => [
    ...equipmentKeys.all,
    "infinity",
    searchValue,
  ],
};

export default equipmentKeys;
