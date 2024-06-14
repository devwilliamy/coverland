import { DateTime } from 'luxon';

export const getClientTimeZone = (): string => {
  const timeZoneOffset: number = new Date().getTimezoneOffset();
  // Timezone offset in minutes for PST, MST, CST, EST
  const PST: number = 480; // UTC -8
  const MST: number = 420; // UTC -7
  const CST: number = 360; // UTC -6
  const EST: number = 300; // UTC -5

  // Converting the offset to the string commonly returned by Intl.DateTimeFormat().resolvedOptions().timeZone
  if (timeZoneOffset === PST) {
    return 'America/Los_Angeles';
  } else if (timeZoneOffset === MST) {
    return 'America/Denver';
  } else if (timeZoneOffset === CST) {
    return 'America/Chicago';
  } else if (timeZoneOffset === EST) {
    return 'America/New_York';
  } else {
    return 'Unknown';
  }
};

/**
 * Determines the delivery by date.
 * Current logic is for PST, before 2 PM, delivery date will be 2 days later.
 * If after 2 PM, add another day.
 * For MST, it will be 3 days later. For CST, 4 days later. For EST, 5 days later.
 * Currently don't know what to do for other time zones and defaulting to 5 days later.
 * 
 * @param format string : format of the date output | default -> "Jul 15" | "EEE, LLL dd" -> "Mon, Jul 15"
 * @returns string
 */
export const determineDeliveryByDate = (format = 'LLL dd'): string => {
  const clientTimeZone: string = getClientTimeZone();
  const now: DateTime = DateTime.now().setZone(clientTimeZone);
  let daysToAdd: number;

  switch (clientTimeZone) {
    case 'America/Los_Angeles': // PST
      daysToAdd = 2;
      break;
    case 'America/Denver': // MST
      daysToAdd = 3;
      break;
    case 'America/Chicago': // CST
      daysToAdd = 4;
      break;
    case 'America/New_York': // EST
      daysToAdd = 5;
      break;
    case 'Unknown':
      daysToAdd = 5;
      break;
    default:
      daysToAdd = 0; // Adjusted if needed
  }

  // If it's after 2 PM, add an extra day
  if (now.hour >= 14) {
    daysToAdd += 1;
  }

  const deliveryDate: DateTime = now.plus({ days: daysToAdd });

  return deliveryDate.toFormat(format);
};