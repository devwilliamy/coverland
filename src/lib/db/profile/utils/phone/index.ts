/**
 * +13043742252 -> (304) 374-2252
 * 13043742252 -> (304) 374-2252
 * 3043742252 -> (304) 374-2252
 * 
 * @param phoneNumber | string of at least 10 char
 * @returns formatted phone number | string (XXX) XXX-XXXX
 */
export function formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
    // Check if the cleaned number is at least 10 digits long
    if (cleaned.length < 10) {
        throw new Error("Invalid phone number, must have at least 10 digits");
    }
    
    // Extract the last 10 digits of the cleaned number
    let lastTenDigits = cleaned.slice(-10);
    
    // Format the last 10 digits
    let formatted = '(' + lastTenDigits.slice(0, 3) + ') ' + lastTenDigits.slice(3, 6) + '-' + lastTenDigits.slice(6);
    
    return formatted;
}