/**
 * "319.9" => "$319.90"
 *
 * @param value number | string
 * @returns string formatted as '$XX.XX'
 */
export function formatMoney(value: number | string): string {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  return `$${numberValue.toFixed(2)}`;
}
