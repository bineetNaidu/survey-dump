export const getCreatedAt = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate()}`;
};
