/**
 * Cleans up a string by removing leading and trailing white spaces
 * and collapsing multiple spaces into a single space.
 *
 * @param str - The input string to clean.
 * @returns A cleaned string with no leading/trailing spaces and single spaces between words.
 */
export function cleanString(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

export function capitalizeFirstLetter(title: string): string {
  return title.replace(title.charAt(0), title.charAt(0).toUpperCase());
}
