import { DateTime } from 'luxon';

// Example: 1713216693  -> April 15, 2024, at 21:31:33
export const convertUnixTimestampToUTCDate = (timestamp: number) => {
  // Convert Unix timestamp to milliseconds by multiplying by 1000
  const date = new Date(timestamp * 1000);
  return date.toString();
};

// Example: "Mon Apr 15 2024 17:43:25 GMT-0700 (Pacific Daylight Time)" -> "2024-04-16T00:43:25.000Z"
export const convertDateStringToPostgresqlTimestamp = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

// Example: 1713216693 -> "2024-04-16T00:43:25.000Z"
export const convertUnixTimestampToISOString = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
};

export const getCurrentTimeInISOFormat = () => {
  return new Date().toISOString();
};

// Outputs: "May 10, 2024" (if today is May 10, 2024)
export const getCurrentDayInLocaleDateString = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate;
};

// Output Example: 2024-06-07T13:01:00-07:00
export const getCurrentDateInPST = () => {
  const pstDate = DateTime.now().setZone('America/Los_Angeles').toISO();
  return pstDate;
};

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
