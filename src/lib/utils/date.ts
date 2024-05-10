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
