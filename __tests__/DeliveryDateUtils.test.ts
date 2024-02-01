import '@testing-library/jest-dom';
import {
  getClientTimeZone,
  determineDeliveryByDate,
} from '@/lib/utils/deliveryDateUtils';
import { DateTime } from 'luxon';

describe('getClientTimeZone', () => {
  // Mocking Date.getTimezoneOffset
  const mockGetTimezoneOffset = (offset: number) => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(offset);
  };
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

describe('determineDeliveryByDate on 1/20 1 PM', () => {
  // Mock DateTime.now() before each test
  beforeAll(() => {
    jest
      .spyOn(DateTime, 'now')
      .mockImplementation(
        () => DateTime.fromISO('2024-01-20T13:00:00') as DateTime<true>
      );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should add 2 days for America/Los_Angeles timezone', () => {
    // Mock getClientTimeZone
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 480;
    });
    expect(determineDeliveryByDate()).toBe('Jan 22');
  });

  it('should add 3 days for America/Denver timezone', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 420;
    });
    expect(determineDeliveryByDate()).toBe('Jan 23');
  });

  it('should add 4 days for America/Chicago timezone', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 360;
    });
    expect(determineDeliveryByDate()).toBe('Jan 24');
  });

  it('should add 5 days for America/New_York timezone', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 300;
    });
    expect(determineDeliveryByDate()).toBe('Jan 25');
  });
});

describe('determineDeliveryByDate on 1/20 2:01 PM', () => {
  // Mock DateTime.now() before each test
  beforeAll(() => {
    jest
      .spyOn(DateTime, 'now')
      .mockImplementation(
        () => DateTime.fromISO('2024-01-20T14:01:00') as DateTime<true>
      );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should add 3 days for America/Los_Angeles timezone', () => {
    // Mock getClientTimeZone
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 480;
    });
    expect(determineDeliveryByDate()).toBe('Jan 23');
  });

  it('should add 4 days for America/Denver timezone', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 420;
    });
    expect(determineDeliveryByDate()).toBe('Jan 24');
  });

  it('should add 5 days for America/Chicago timezone', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 360;
    });
    expect(determineDeliveryByDate()).toBe('Jan 25');
  });

  it('should add 6 days for America/New_York timezone', () => {
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => {
      return 300;
    });
    expect(determineDeliveryByDate()).toBe('Jan 26');
  });
});
