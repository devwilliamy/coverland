import '@testing-library/jest-dom';
import {
  getClientTimeZone,
  determineDeliveryByDate,
} from '@/components/PDP/components/DeliveryDate';
// import { DateTime } from 'luxon';

// Mock the Date object to return a specific time zone offset for the test
// Mocking Date.getTimezoneOffset
const mockGetTimezoneOffset = (offset: number) => {
  jest.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(offset);
};

describe('getClientTimeZone', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return America/Los_Angeles for PST', () => {
    mockGetTimezoneOffset(480); // PST offset
    expect(getClientTimeZone()).toBe('America/Los_Angeles');
  });

  it('should return America/Denver for MST', () => {
    mockGetTimezoneOffset(420); // MST offset
    expect(getClientTimeZone()).toBe('America/Denver');
  });

  it('should return America/Chicago for CST', () => {
    mockGetTimezoneOffset(360); // CST offset
    expect(getClientTimeZone()).toBe('America/Chicago');
  });

  it('should return America/New_York for EST', () => {
    mockGetTimezoneOffset(300); // EST offset
    expect(getClientTimeZone()).toBe('America/New_York');
  });

  it('should return Unknown for an unknown offset', () => {
    mockGetTimezoneOffset(999); // Unknown offset
    expect(getClientTimeZone()).toBe('Unknown');
  });
});

// jest.mock('@/components/PDP/components/DeliveryDate', () => ({
//   getClientTimeZone: jest.fn(),
// }));

// jest.spyOn(DateTime, 'now').mockImplementation(() => {
//     // Return a mocked DateTime object
//     return DateTime.fromObject({ /* your mock date and time */ }, { zone: 'UTC' });
//   });

// jest.mock('luxon', () => {
//   const actualLuxon = jest.requireActual('luxon');
//   return {
//     ...actualLuxon,
//     DateTime: {
//       ...actualLuxon.DateTime,
//       now: jest.fn(),
//     },
//   };
// });

// jest.mock('luxon', () => ({
//   DateTime: {
//     now: () => ({
//       setZone: () => ({
//         hour: 13, // Mocking 1 PM (hour 13)
//         plus: (options: any) => ({
//           toFormat: (format: string) => `Mocked Delivery Date: ${format}`,
//         }),
//       }),
//     }),
//   },
// }));

describe.only('determineDeliveryByDate', () => {
  // Mock DateTime.now() before each test
  beforeAll(() => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      // Return the desired offset value here
      return 480; // This would simulate PST
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return America/Los_Angeles for PST', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      // Return the desired offset value here
      return 480; // This would simulate PST
    });
    const timeZone = getClientTimeZone();
    expect(timeZone).toBe('America/Los_Angeles');
  });

  it('should add 2 days for America/Los_Angeles timezone', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 480;
    });
    expect(determineDeliveryByDate()).toBe('Feb 01'); // Adjust the expected value based on your logic
  });

  it('should add 3 days for America/Denver timezone', () => {
    jest
      .spyOn(Date.prototype, 'getTimezoneOffset')
      .mockImplementation(() => 420);
    expect(determineDeliveryByDate()).toBe('Feb 02');
  });

  // it('should add 4 days for America/Chicago timezone', () => {
  //   jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
  //     return 360; // Offset for CST
  //   });
  //   jest
  //     .spyOn(DateTime, 'now')
  //     .mockReturnValue(DateTime.fromISO('2024-01-28T13:00:00')); // Mock current date and time
  //   expect(determineDeliveryByDate()).toBe('Feb 01'); // Adjust the expected value based on your logic
  // });

  // it('should add 5 days for America/New_York timezone', () => {
  //   jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
  //     return 300; // Offset for EST
  //   });
  //   jest
  //     .spyOn(DateTime, 'now')
  //     .mockReturnValue(DateTime.fromISO('2024-01-28T13:00:00')); // Mock current date and time
  //   expect(determineDeliveryByDate()).toBe('Feb 02'); // Adjust the expected value based on your logic
  // });

  // // Add more tests for other time zones...

  // it('should add an extra day if after 2 PM', () => {
  //   // Mock DateTime.now() to a time after 2 PM
  //   DateTime.now.mockImplementation(() => {
  //     return DateTime.fromObject({
  //       year: 2024,
  //       month: 1,
  //       day: 18,
  //       hour: 15,
  //       zone: 'UTC',
  //     });
  //   });

  //   getClientTimeZone.mockReturnValue('America/Los_Angeles');
  //   expect(determineDeliveryByDate()).toBe('Jan 21'); // Assuming it's 1 day extra after 2 PM
  // });

  // Add more tests as needed...
});
