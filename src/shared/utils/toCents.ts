const toCents = (value: number | string): number =>
  Math.round(Number(value) * 100);

export default toCents;
