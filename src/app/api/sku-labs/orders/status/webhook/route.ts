import { NextRequest, NextResponse } from 'next/server';
import { SkuLabOrderResponse } from '../../route';
import { DateTime } from 'luxon';
import { supabaseDatabaseClient } from '@/lib/db/supabaseClients';
import {
  sendShippingConfirmationEmailToSendGrid,
  generateDynamicTemplateDataFromUserOrder,
  generateSendGridApiPayload,
} from '@/lib/sendgrid/emails/shipping-confirmation';
import { fetchUserOrderById } from '@/lib/db/orders/getOrderByOrderId';

function getTimestamp() {
  return DateTime.now().setZone('America/Los_Angeles').toISO();
}

/**
 *
 * @param {string} input - Timestamp string
 * @param {string} timezone - Default UTC
 * @returns
 * Example Input:
 * '2024-06-10T19:30:23.627Z' -> 2024-06-10T12:30:23.627-07:00
 * 1718015931000 -> 2024-06-10T12:30:23.627-07:00
 */
function formatTime(input: string, timezone = 'UTC') {
  let dateTime;

  if (typeof input === 'string') {
    dateTime = DateTime.fromISO(input, { zone: 'utc' });
  } else if (typeof input === 'number') {
    dateTime = DateTime.fromMillis(input, { zone: 'utc' });
  } else {
    throw new Error('Invalid input type. Expected a string or number.');
  }

  if (timezone === 'PST') {
    dateTime = dateTime.setZone('America/Los_Angeles');
  } else if (timezone === 'UTC') {
    dateTime = dateTime.setZone('utc');
  } else {
    throw new Error('Invalid timezone. Expected "UTC" or "PST".');
  }

  return dateTime.toISO();
}

const SKU_LAB_URL = 'https://api.skulabs.com';

export async function POST(request: NextRequest): Promise<SkuLabOrderResponse> {
  // TODO: Probably good to have schema validation here
  const webhookData = await request.json();
  console.info(`[${getTimestamp()}] Webhook received:`, webhookData);

  // Once received webhook, get the order number and store number
  if (
    !webhookData.data ||
    !webhookData.data.store_id ||
    !webhookData.data.order_number
  ) {
    console.error(
      `[${getTimestamp()}] Webhook Data did not container store id or order number`
    );
    return NextResponse.json(
      {
        message: `[${getTimestamp()}] Webhook Data did not contain store id or order number`,
      },
      { status: 200 } // Returning 200 because I think SKU Labs will try to re-send this if it got a 400
    );
  }

  const { store_id, order_number } = webhookData.data;
  const apiUrl = `https://api.skulabs.com/order/get_single?store_id=${store_id}&order_number=${order_number}`;
  try {
    // Make the request to the SKU Labs API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SKU_LABS_API_KEY}`,
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    const { order: orderData } = data;

    if (
      orderData &&
      orderData.shipments &&
      orderData.shipments.length > 0 &&
      order_number.startsWith('CL')
    ) {
      const shipment = orderData.shipments[0].response;
      console.log(
        `${getTimestamp()} OrderData Shipments ${order_number}:`,
        shipment
      );

      // Extract necessary data for the Supabase update
      const shipping_carrier = shipment.provider || '';
      const shipping_service = shipment.service || '';
      const shipping_tracking_number = shipment.tracking_number || '';
      const shipping_status_last_updated_pst = formatTime(
        webhookData.data.time,
        'PST'
      );
      const shipping_status_last_updated = formatTime(webhookData.data.time);
      const shipping_previous_status = webhookData.data.original_status;
      const shipping_status = webhookData.data.status;

      const TABLE_NAME = order_number.includes('TEST')
        ? '_Orders_TEST'
        : '_Orders';
      // Update the _Orders table in Supabase
      const { data, error } = await supabaseDatabaseClient
        .from(TABLE_NAME)
        .update({
          shipping_carrier,
          shipping_service,
          shipping_tracking_number,
          shipping_status_last_updated,
          shipping_status_last_updated_pst,
          shipping_previous_status,
          shipping_status,
        })
        .eq('order_id', order_number)
        .select();

      if (error) {
        console.error(`[/sku-labs/orders/status/webhook] Error: `, error);
        throw error;
      } else {
        console.info(
          `[sku-labs/orders/status/webhook] ${getTimestamp()}: Updated Data received: `,
          data
        );
      }

      console.info(
        `[sku-labs/orders/status/webhook] ${getTimestamp()}: Order updated successfully: ${order_number}`
      );
      /*
      
        [TODO]: Send Tracking Number Email.

      */

      const fullOrderData = await fetchUserOrderById(data[0].id);

      const emailTo = fullOrderData?.customer_email;

      const testOrder = {
        id: 2332,
        order_id: 'CL-TEST-240619-MX-0093',
        order_date: '2024-06-19T22:39:59+00:00',
        total_amount: '2479.40',
        status: 'COMPLETE',
        transaction_id: 'pi_3PTXAZDnAldfe1lt4YzgZD8Z',
        payment_status: 'succeeded',
        payment_method: 'card',
        card_amount: 2479.4,
        card_brand: 'visa',
        card_fingerprint: 'TQvfz2g4Iq6DtrG1',
        card_funding: 'credit',
        customer_id: 1284,
        payment_date: '06/19/2024',
        customer_name: 'John Doe',
        customer_email: 'john.l.coverland@gmail.com',
        customer_phone: null,
        shipping_address_line_1: '4242 Main Street',
        shipping_address_line_2: 'PO Box 424',
        shipping_address_city: 'Norwalk',
        shipping_address_state: 'CA',
        shipping_address_postal_code: '42424',
        shipping_address_country: 'US',
        shipping_carrier: 'ups',
        shipping_tracking_number: '1ZA039660311981504',
        billing_address_line_1: '4242 Main Street',
        billing_address_line_2: 'PO Box 424',
        billing_address_city: 'Norwalk',
        billing_address_state: 'CA',
        billing_address_postal_code: '42424',
        billing_address_country: 'US',
        notes: null,
        created_at: '2024-06-19T22:40:00.604703+00:00',
        updated_at: '2024-06-19T22:44:55.667+00:00',
        payment_method_id: 'pm_1PTXFDDnAldfe1ltpgV6tZSB',
        skus: 'CL-CC-CP-15-H-BKGR-STR-PP-100118,CL-SC-10-F-10-B-32-GR-1TO-20005,CL-SC-10-F-10-GR-1TO-20005',
        currency: 'usd',
        payment_gateway: 'stripe',
        payment_gateway_customer_id: null,
        wallet_type: null,
        billing_customer_name: 'John Doe',
        created_at_pst: '2024-06-19T15:40:00.604703+00:00',
        shipping_previous_status: 'unstarted',
        shipping_status: 'shipped',
        shipping_status_last_updated_pst: '2024-06-21 13:29:32.845',
        shipping_service: 'Ground',
        shipping_status_last_updated: '2024-06-21 20:29:32.845+00',
        total_original_amount: 4960,
        total_discount_amount: '2480.60',
        items: [
          {
            id: 2404,
            order_id: 2332,
            created_at: '2024-06-19T22:40:01.615391+00:00',
            product_id: 2403,
            quantity: 2,
            price: '359.90',
            original_price: 720,
            discount_amount: 360.1,
            // associated order item product object here: //
            product: {
              id: 2403,
              sku: 'CL-CC-CP-15-H-BKGR-STR-PP-100118',
              parent_generation: '2005-2024',
              year_generation: '2005-2024',
              make: 'Aston Martin',
              model: 'Vantage',
              submodel1: null,
              submodel2: null,
              submodel3: null,
              feature:
                'http://www.coverland.com/custom-cover/01-bkgr-str-m.webp',
              product:
                'http://www.coverland.com/custom-cover/01-bkgr-str-m.webp,http://www.coverland.com/pms/02-bkgr-str-m.webp,http://www.coverland.com/pms/03-bkgr-str-m.webp,http://www.coverland.com/pms/04-bkgr-str-m.webp,http://www.coverland.com/pms/05-bkgr-str-m.webp,http://www.coverland.com/pms/06-bkgr-str-m.webp,http://www.coverland.com/pms/07-bkgr-str-m.webp,http://www.coverland.com/pms/08-bkgr-str-m.webp,http://www.coverland.com/pms/09-bkgr-str-m.webp,http://www.coverland.com/pms/10-bkgr-str-m.webp,http://www.coverland.com/pms/11-bkgr-str-m.webp,http://www.coverland.com/pms/12-bkgr-str-m.webp',
              product_video_carousel_thumbnail:
                'http://coverland.com/video/thumbnails/Challenger_Thumbnail.webp',
              product_video_carousel:
                'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20360%20Square_Small-40XPIrsyzagRPC7jg5IsiK3vIav0SN.mp4',
              product_video_zoom:
                'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20Zoom%20Video_Small-a6PwN5MRo4nAHSsKZ5EzlQqwCtkfa3.mp4',
              product_video_360:
                'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20360%20Video_Small-ZuVCNYnGLFHCWL0kGSLH134B4pSasz.mp4',
              banner:
                'https://coverland.sfo3.cdn.digitaloceanspaces.com/pdpbanner/pdpbanner-aston-martin-vantage-2005-2024-100118.webp',
              type: 'Car Covers',
              year_options:
                '2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024',
              make_slug: 'aston-martin',
              model_slug: 'vantage',
              msrp: 179.95,
              price: 360,
              quantity: '25',
              display_color: 'Black Gray Stripe',
              display_id: 'Premium Plus',
              display_set: null,
              'skulabs SKU': 'CC-CP-15-H-BKGR-STR',
              discount: '180.05',
            },
          },
        ],
      };

      const toSendgrid = {
        to: emailTo,
        dynamic_template_data:
          generateDynamicTemplateDataFromUserOrder(testOrder),
      };

      sendShippingConfirmationEmailToSendGrid(
        generateSendGridApiPayload(toSendgrid)
      );

      /*
      
        [TODO]: Have to update Stripe and Paypal Tracking Number Here too

      */

      return NextResponse.json(
        {
          message: `[${getTimestamp()}]: Order updated successfully: ${order_number}`,
          data,
        },
        { status: 200 }
      );
    } else {
      console.warn(
        `${getTimestamp()} No shipments found in the order data: ${order_number}`
      );
      return NextResponse.json(
        {
          message: `${getTimestamp()} No shipments found in the order data: ${order_number}`,
        },
        { status: 200 } // Returning 200 because I think SKU Labs will try to re-send this if it got a 400
      );
    }
  } catch (error) {
    console.error(
      `${getTimestamp()} Error caught: No shipments found in the order data: ${order_number}. ${JSON.stringify(error)}`
    );
    return NextResponse.json(
      {
        message: `${getTimestamp()} No shipments found in the order data or does not start with CL: ${order_number}. ${JSON.stringify(error)}`,
      },
      { status: 500 } // Keeping this as 500 because that means something went wrong
    );
  }
}
