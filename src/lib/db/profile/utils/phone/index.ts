/**
 * +13043742252 -> (304) 374-2252
 * 13043742252 -> (304) 374-2252
 * 3043742252 -> (304) 374-2252
 * 
 * @param phoneNumber | string of at least 10 char | null
 * @returns formatted phone number | string (XXX) XXX-XXXX | null (if phoneNumber is null)
 */
export function formatPhoneNumber(phoneNumber: string | null): string | null {
    if (!phoneNumber) {
        return null;
    }

    // Remove all non-numeric characters
    let cleaned: string = phoneNumber.replace(/\D/g, '');

    if (cleaned.length < 10) {
        throw new Error("Invalid phone number, must have at least 10 digits");
    }

    let lastTenDigits: string = cleaned.slice(-10);

    // Format the last 10 digits
    let formatted: string = `(${lastTenDigits.slice(0, 3)}) ${lastTenDigits.slice(3, 6)}-${lastTenDigits.slice(6)}`;

    return formatted;
}