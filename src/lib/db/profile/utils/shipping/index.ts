const countryNames: { [key: string]: string } = {
    "US": "United States",
    "CA": "Canada",
    "GB": "United Kingdom",
    "AU": "Australia",
    "DE": "Germany",
    "FR": "France",
    "IT": "Italy",
    "JP": "Japan",
    "CN": "China",
    "IN": "India",
    "BR": "Brazil",
    "RU": "Russia",
    "MX": "Mexico",
    "ZA": "South Africa",
    "KR": "South Korea",
    // Add more country codes and names as needed
};


/**
 * "US" => "United States"
 *
 * @param value string
 * @returns string
 */
export function getFullCountryName(abbreviation: string | null): string | null {
    if(!abbreviation) {
        return null;
    }

    return countryNames[abbreviation] || abbreviation;
}