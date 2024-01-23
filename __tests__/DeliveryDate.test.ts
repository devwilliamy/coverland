import '@testing-library/jest-dom';
import {
  getClientTimeZone,
  //   determineDeliveryByDate,
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

// describe.only('determineDeliveryByDate', () => {
//   // Mock DateTime.now() before each test
//   beforeEach(() => {
//     jest.spyOn(DateTime, 'now').mockImplementation(() => {
//       return DateTime.fromObject({
//         year: 2024,
//         month: 1,
//         day: 18,
//         hour: 13,
//         zone: 'UTC',
//       }); // Set a specific date and time
//     });
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   it('should add 2 days for America/Los_Angeles timezone', () => {
//     debugger;
//     getClientTimeZone.mockReturnValue('America/Los_Angeles');
//     expect(determineDeliveryByDate()).toBe('Jan 20'); // Adjust the expected value based on your logic
//   });

//   it('should add 3 days for America/Denver timezone', () => {
//     getClientTimeZone.mockReturnValue('America/Denver');
//     expect(determineDeliveryByDate()).toBe('Jan 21');
//   });

//   // Add more tests for other time zones...

//   it('should add an extra day if after 2 PM', () => {
//     // Mock DateTime.now() to a time after 2 PM
//     DateTime.now.mockImplementation(() => {
//       return DateTime.fromObject({
//         year: 2024,
//         month: 1,
//         day: 18,
//         hour: 15,
//         zone: 'UTC',
//       });
//     });

//     getClientTimeZone.mockReturnValue('America/Los_Angeles');
//     expect(determineDeliveryByDate()).toBe('Jan 21'); // Assuming it's 1 day extra after 2 PM
//   });

//   // Add more tests as needed...
// });
