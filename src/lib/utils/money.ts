/**
 * 
 * @param num number | string
 * @returns number
 * 
 * Examples:
 *  123 -> 123
 *  123.4 -> 123.40
 *  123.456 -> 123.46
 *  123.00 -> 123
 *  "123" -> 123
 *  "abc" -> Throws an error
 */
export function formatMoneyAsNumber(num: number | string): number | string {
  // Attempt to parse the input as a float
  const parsedNum = parseFloat(num as string);
  
  // Check if the result is a valid number
  if (isNaN(parsedNum)) {
    throw new Error("Invalid number input");
  }
  
  // Determine if the number is a whole number
  if (Number.isInteger(parsedNum)) {
    return parsedNum;
  }
  
  // Format the number to two decimal places if it's not a whole number
  return parsedNum.toFixed(2);
}

/**
 * 
 * @param num number | string
 * @returns number
 * 
 * Examples:
 *  720.02 -> 720
 *  123.99 -> 123
 *  123 -> 123
 *  "720.02" -> 720
 *  "abc" -> Throws an error
 */
export function trimToWholeNumber(num: number | string): number {
  // Attempt to parse the input as a float
  const parsedNum = parseFloat(num as string);
  
  // Check if the result is a valid number
  if (isNaN(parsedNum)) {
    throw new Error("Invalid number input");
  }
  
  // Truncate the number to remove the decimal places
  return Math.floor(parsedNum);
}