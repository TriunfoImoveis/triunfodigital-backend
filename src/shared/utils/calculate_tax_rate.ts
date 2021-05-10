
export default function calculate_tax_rate(value_integral: number, tax_rate: number): number {
    const result = value_integral * (tax_rate / 100);
    return value_integral - result;
}