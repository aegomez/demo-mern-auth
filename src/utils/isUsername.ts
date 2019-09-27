export const isUsername = (value: string) => {
  if (typeof value !== 'string') return false;
  return /^[A-Za-z0-9]+[\w\-_]+[A-Za-z0-9]+$/.test(value);
};
