export const tags_not_contains = (tags) => {
  const arr = [];
  tags.forEach((tag) => {
    arr.push({ tags_ncontains: [tag] });
  });

  return arr;
};
