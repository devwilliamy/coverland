import { TCartItem } from '../cart/useCart';
import { getCartTotalPrice } from '../utils/calculations';
import { StripeAddress } from '../types/checkout';
import { updateAdminPanelOrder } from '../db/admin-panel/orders';
import { postTaxData } from '../db/taxjar';
import { updateAdminPanelOrderItem } from '../db/admin-panel/orderItems';
import { updateStripePaymentIntent } from '../stripe/paymentIntent';

type TaxJarResponse = {
  tax: {
    amount_to_collect: number;
    breakdown: {
      city_tax_collectable: number;
      city_tax_rate: number;
      county_tax_collectable: number;
      county_tax_rate: number;
      special_district_tax_collectable: number;
      special_tax_rate: number;
      state_tax_collectable: number;
      state_tax_rate: number;
      taxable_amount: number;
      line_items: Array<{
        id: string;
        tax_collectable: number;
        taxable_amount: number;
      }>;
    };
    jurisdictions: {
      city: string;
      county: string;
      state: string;
    };
  };
};

// Prepare tax items from cart items
function prepareTaxItems(cartItems: TCartItem[]): Array<{
  id: string | number;
  quantity: string | number;
  unit_price: number;
  discount: number;
}> {
  return cartItems.map((item, index) => ({
    id: item.id ?? index,
    quantity: item.quantity ?? '0',
    unit_price: item.msrp ?? 0,
    discount: 0,
  }));
}

// Prepare request body for TaxJar API
function prepareTaxJarRequestBody(
  cartItems: TCartItem[],
  shipping: number,
  shippingAddress: StripeAddress
) {
  const taxItems = prepareTaxItems(cartItems);

  return {
    to_country: shippingAddress.address.country,
    to_zip: shippingAddress.address.postal_code,
    to_state: shippingAddress.address.state,
    shipping: shipping,
    line_items: taxItems,
  };
}

async function getTaxJarTaxData(bodyData: any): Promise<any> {
  const response = await fetch('/api/taxjar/sales-tax', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bodyData }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Update Order, OrderItem, OrderTax tables with tax information
 * @param orderId
 * @param orderNumber
 * @param taxData
 */
async function updateTaxColumnsInDB(
  orderId: number,
  orderNumber: string,
  taxData
) {
  // Update database with tax information
  const { tax } = taxData;

  // Update Orders table
  try {
    const updatedOrder = await updateAdminPanelOrder(
      { total_tax: tax.amount_to_collect },
      orderNumber
    );
  } catch (error) {
    console.error(
      'Update Tax Data error on updating admin panel order: ',
      error
    );
  }
  // Prepare tax entries
  const taxEntries = [
    {
      order_id: orderId,
      jurisdiction: tax.jurisdictions.state,
      tax_type: 'state',
      tax_rate: tax.breakdown.state_tax_rate,
      taxable_amount: tax.breakdown.taxable_amount,
      tax_amount: tax.breakdown.state_tax_collectable,
    },
    {
      order_id: orderId,
      jurisdiction: tax.jurisdictions.county,
      tax_type: 'county',
      tax_rate: tax.breakdown.county_tax_rate,
      taxable_amount: tax.breakdown.taxable_amount,
      tax_amount: tax.breakdown.county_tax_collectable,
    },
    {
      order_id: orderId,
      jurisdiction: tax.jurisdictions.city,
      tax_type: 'city',
      tax_rate: tax.breakdown.city_tax_rate,
      taxable_amount: tax.breakdown.taxable_amount,
      tax_amount: tax.breakdown.city_tax_collectable,
    },
    {
      order_id: orderId,
      jurisdiction: 'Special District',
      tax_type: 'special',
      tax_rate: tax.breakdown.special_tax_rate,
      taxable_amount: tax.breakdown.taxable_amount,
      tax_amount: tax.breakdown.special_district_tax_collectable,
    },
  ];

  // Insert tax entries
  const taxEntriesResponse = await postTaxData(taxEntries);

  // Update OrderItems
  for (const lineItem of tax.breakdown.line_items) {
    const orderItem = await updateAdminPanelOrderItem(
      { tax_amount: lineItem.tax_collectable },
      lineItem.id,
      orderId
    );
  }
}

/**
 * Handles Getting Tax Info and Updating Tables with Tax Info
 * @param cartItems
 * @param shipping
 * @param shippingAddress
 * @param orderId
 * @param orderNumber
 * @returns
 */
export async function handleTaxjarCalculation(
  cartItems: TCartItem[],
  shipping: number,
  shippingAddress: StripeAddress,
  orderId: number,
  orderNumber: string
): Promise<number> {
  try {
    console.log('ShippingAddress:', { shippingAddress });
    debugger;
    const bodyData = prepareTaxJarRequestBody(
      cartItems,
      shipping,
      shippingAddress
    );
    const taxData = await getTaxJarTaxData(bodyData);
    await updateTaxColumnsInDB(orderId, orderNumber, taxData);

    console.log('TaxData:', JSON.stringify(taxData, null, 2));
    const amountToCollect = taxData?.tax?.amount_to_collect ?? 0;

    return amountToCollect;
  } catch (error) {
    console.error('Error in TaxJar calculation:', error);
    throw error;
  }
}

// Might need this for google / apple card or klarna ?
// if (totalWithTax) {
//   try {
//     elements?.update({
//       amount: totalWithTax,
//       mode: 'payment',
//       currency: 'usd',
//     });
//     await elements?.submit();
//   } catch (error) {
//     console.error(error);
//   }
// }

export default handleTaxjarCalculation;
