export const getNomCost = (
  name: string,
  years: number,
  isVoucher?: boolean
) => {
  const cost = isVoucher ? years : years * 5;
  if (name.length <= 3) {
    return cost * 4;
  }
  return cost;
};

export const getNomYears = (
  name: string,
  cost: number,
  isVoucher?: boolean
) => {
  const years = isVoucher ? cost : cost / 5;
  if (name.length <= 3) {
    return years / 4;
  }
  return years;
};
