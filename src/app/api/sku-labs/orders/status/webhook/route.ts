import { NextRequest, NextResponse } from 'next/server';
import { SkuLabOrderResponse } from '../../route';
import { DateTime } from 'luxon';
import { supabaseDatabaseClient } from '@/lib/db/supabaseClients';

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
        message: `[${getTimestamp()}] Webhook Data did not container store id or order number`,
      },
      { status: 400 }
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
    // const {
    //   data: {
    //     order: { orderData },
    //   },
    // } = await response.json();
    const data = await response.json();
    const { order: orderData } = data;

    if (
      orderData &&
      orderData.shipments &&
      orderData.shipments.length > 0 &&
      order_number.startsWith('CL')
    ) {
      const shipment = orderData.shipments[0].response;
      console.log(`${getTimestamp()} OrderData Shipments:`, shipment);

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
      console.error(
        `${getTimestamp()} No shipments found in the order data: ${order_number}`
      );
      return NextResponse.json(
        {
          message: `${getTimestamp()} No shipments found in the order data: ${order_number}`,
        },
        { status: 400 }
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
      { status: 500 }
    );
  }
}
