/**
 * "319.9" => "$319.90"
 *
 * @param value any (expects number, or string however)
 * @returns string formatted as $XX.XX
 */
export function formatMoney(value) {
  // Ensure the value is a number
  if (isNaN(value)) {
    throw new Error('Invalid number');
  }

  const numberValue = parseFloat(value);

  const formattedValue = numberValue.toFixed(2);

  return `$${formattedValue}`;
}
