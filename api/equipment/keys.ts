const equipmentKeys = {
  all: ["equipments"] as const,
  equipment: (id: string | number) => [...equipmentKeys.all, id.toString()],
  equipmentCategories: () => [...equipmentKeys.all, "categories"],
  infinity: (searchValue: string = "", stringifiedCategories: string = "") => [
    ...equipmentKeys.all,
    "infinity",
    searchValue,
    stringifiedCategories,
  ],
};

export default equipmentKeys;
