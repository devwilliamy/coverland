export function formatMoneyAsNumber(num: number | string): number {
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
    return parseFloat(parsedNum.toFixed(2));  // Output: 123
  }

//   try {
//     console.log(formatToTwoDecimalPlaces(123));        // Output: 123
//     console.log(formatToTwoDecimalPlaces(123.4));      // Output: 123.4
//     console.log(formatToTwoDecimalPlaces(123.456));    // Output: 123.46
//     console.log(formatToTwoDecimalPlaces(123.00));     // Output: 123
//     console.log(formatToTwoDecimalPlaces("123"));      // Output: 123
//     console.log(formatToTwoDecimalPlaces("123.4"));    // Output: 123.4
//     console.log(formatToTwoDecimalPlaces("123.456"));  // Output: 123.46
//     console.log(formatToTwoDecimalPlaces("123.00"));   // Output: 123
//     console.log(formatToTwoDecimalPlaces("abc"));      // Throws an error
//   } catch (error) {
//     console.error(error.message);
//   }