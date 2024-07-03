/**
 * "credit" -> "Credit"
 * 
 * @param str | null
 * @returns str
 */
export function capitalizeString(str: string | null): string {
    if (!str ||str.length === 0) {
        return "";
    }
    
    return str.charAt(0).toUpperCase() + str.slice(1);
}