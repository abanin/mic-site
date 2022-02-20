const removeAllUndefinedValues = (obj?: Record<string, unknown>) => {
  const clone = { ...obj };
  for (const key in clone) {
    if (clone[key] === undefined) delete clone[key];
  }

  return clone;
};

export default removeAllUndefinedValues;
