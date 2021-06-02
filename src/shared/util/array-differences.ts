export const arrayDifferences = (olds: string[], news: string[]) => {
  const deleted = new Set(olds);

  const created = news.filter(current => {
    const exist = deleted.has(current);

    if (exist) {
      deleted.delete(current);
    }

    return !exist;
  });

  return { create: created, delete: Array.from(deleted) };
};
