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

/**
 *
 * @param isoDateString "2024-06-07T13:01:00-07:00"
 * @returns string "06/07/2024"
 */
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

/**
 * Need this one because without a timezone, it'll assume UTC midnight. This will cause the date to shift.
 * @param isoDateString "2024-06-07"
 * @returns string "06/07/2024"
 */
export function formatISODateNoTimeZone(isoDateString: string): string {
  const [year, month, day] = isoDateString.split('-');

  if (!year || !month || !day) {
    throw new Error('Invalid ISO date string');
  }

  return `${month}/${day}/${year}`;
}

export function weeksFromCurrentDate(targetDate: string): number {
  const currentDate = new Date();
  const target = new Date(targetDate);

  const diffInMilliseconds = target.getTime() - currentDate.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  const diffInWeeks = diffInDays / 7;

  return Math.ceil(diffInWeeks);
}

export function getCurrentMonth() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  return monthNames[date.getMonth()];
}

export function calculateTimeTo2PM() {
  const now = new Date();
  const target = new Date();

  target.setHours(14); // Set to 2 PM local time
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);

  if (now.getHours() >= 14) {
    // Adjust for PST timezone offset
    target.setDate(target.getDate() + 1); // Set to next day if past 2 PM
  }

  const diff: number = target.getTime() - now.getTime();

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  if (hours < 0 || minutes < 0) {
    return ''; // In case of negative values
  }

  return `${hours} hours ${minutes} mins`;
}