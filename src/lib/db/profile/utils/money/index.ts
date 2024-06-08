export function formatMoney(value) {
    // Ensure the value is a number
    if (isNaN(value)) {
      throw new Error("Invalid number");
    }
  
    // Convert to number in case the input is a string
    const numberValue = parseFloat(value);
  
    // Format the number to always show two decimal places
    const formattedValue = numberValue.toFixed(2);
  
    // Return the formatted value with a dollar sign
    return `$${formattedValue}`;
  }
  
  // Example usage:
  try {
    const price = 319.9;
    const formattedPrice = formatMoney(price);
    console.log(formattedPrice); // Outputs: $319.90
  } catch (error) {
    console.error(error.message);
  }