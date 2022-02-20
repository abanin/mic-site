const removeAllNullableValues = (obj?: Record<string, unknown>) => {
  const clone = { ...obj };
  for (const key in clone) {
    if (clone[key] === null) delete clone[key];
  }

  return clone;
};

export default removeAllNullableValues;
