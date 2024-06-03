import { TCartItem } from '@/lib/cart/useCart';
import { generateOrderId } from '@/lib/utils/stripe';

describe('generateOrderId', () => {
  it('should generate an order ID for a single type of item', () => {
    const items: any[] = [
      {
        sku: 'CL-SC-10-F-40-BK-1TO-1035',
        type: 'Seat Covers',
        make: 'Audi',
        model: 'A3',
        year_generation: '2014-2024',
        parent_generation: '2014-2024',
        submodel1: null,
        submodel2: null,
        submodel3: null,
        product:
          'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-bk-1to.webp',
        display_color: 'Solid Black',
        msrp: 139.95,
        price: 280,
        quantity: 1,
        display_id: 'Leather',
        make_slug: 'audi',
        model_slug: 'a3',
        year_options: '2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024',
      },
    ];
    const uniqueNumber = 'AA01';
    const orderId = generateOrderId(items, uniqueNumber);
    expect(orderId).toMatch(/^CL-\d{6}-SE-AA01$/);
  });

  it('should generate an order ID with MX for mixed types of items', () => {
    const items: any[] = [
      {
        sku: 'CL-SC-10-F-40-BK-1TO-1035',
        type: 'Seat Covers',
        make: 'Audi',
        model: 'A3',
        year_generation: '2014-2024',
        parent_generation: '2014-2024',
        submodel1: null,
        submodel2: null,
        submodel3: null,
        product:
          'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-bk-1to.webp',
        display_color: 'Solid Black',
        msrp: 139.95,
        price: 280,
        quantity: 1,
        display_id: 'Leather',
        make_slug: 'audi',
        model_slug: 'a3',
        year_options: '2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024',
      },
      {
        sku: 'CL-CC-20-G-50-RD-2TO-1045',
        type: 'Car Covers',
        make: 'BMW',
        model: 'X5',
        year_generation: '2010-2020',
        parent_generation: '2010-2020',
        submodel1: null,
        submodel2: null,
        submodel3: null,
        product:
          'http://www.coverland.com/custom-car-cover/01-carcover-pc-rd-2to.webp',
        display_color: 'Solid Red',
        msrp: 159.95,
        price: 300,
        quantity: 1,
        display_id: 'Polyester',
        make_slug: 'bmw',
        model_slug: 'x5',
        year_options: '2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020',
      },
    ];
    const uniqueNumber = 'AA02';
    const orderId = generateOrderId(items, uniqueNumber);
    expect(orderId).toMatch(/^CL-\d{6}-MX-AA02$/);
  });

  it('should handle unknown item types with MX', () => {
    const items: any[] = [
      {
        sku: 'CL-XX-10-F-40-BK-1TO-1035',
        type: 'Unknown Type',
        make: 'Audi',
        model: 'A3',
        year_generation: '2014-2024',
        parent_generation: '2014-2024',
        submodel1: null,
        submodel2: null,
        submodel3: null,
        product:
          'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-bk-1to.webp',
        display_color: 'Solid Black',
        msrp: 139.95,
        price: 280,
        quantity: 1,
        display_id: 'Leather',
        make_slug: 'audi',
        model_slug: 'a3',
        year_options: '2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024',
      },
    ];
    const uniqueNumber = 'AA03';
    const orderId = generateOrderId(items, uniqueNumber);
    expect(orderId).toMatch(/^CL-\d{6}-MX-AA03$/);
  });
  it('should generate an order ID with CL-TEST as the brand and -TEST as the suffix', () => {
    const items: TCartItem[] = [
      // Add your item details here
    ];
    const uniqueNumber = 'TEST';
    const orderId = generateOrderId(items, uniqueNumber);
    expect(orderId).toMatch(/^CL-TEST-\d{6}-[A-Z]{2}-TEST$/);
  });
});
