// takes input isoDateString and returns mm/dd/yyyy
export function formatISODate(isoDateString: string): string {
    const date = new Date(isoDateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid ISO date string');
    }

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }