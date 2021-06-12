const getUserValue = e => {
  return {
    _id: e._id,
    name: e.name,
    email: e.email,
  };
};

export { getUserValue };

export const getUserObject = appUser => {
  const { customData } = appUser;
  return getUserValue(customData ? customData : appUser);
};
