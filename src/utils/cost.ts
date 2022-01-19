export const getNomCost = (name: string, years: number) => {
  const cost = years * 5;
  if (name.length <= 3) {
    return cost * 4;
  }
  return cost;
};

export const getNomYears = (name: string, cost: number) => {
  const years = cost / 5;
  if (name.length <= 3) {
    return years / 4;
  }
  return years;
};
