import { getProductAndPriceBySku } from '@/lib/db/admin-panel/products';
import { createSupabaseAdminPanelServerClient } from '@/lib/db/adminPaneSupabaseClient';
import { ADMIN_PANEL_ORDER_ITEMS } from '@/lib/db/constants/databaseTableNames';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { id, skusWithQuantity } = await request.json();
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient =
    createSupabaseAdminPanelServerClient(cookieStore);
  const orderItems = await mapSkusWithQuantityToOrderItem(
    id,
    JSON.parse(skusWithQuantity)
  );

  try {
    const { data, error } = await supabase
      .from(ADMIN_PANEL_ORDER_ITEMS)
      .insert(orderItems);

    if (error) {
      if (Number(error.code) === 23505) {
        console.error('Order Already Exists');
        return NextResponse.json(
          { error: 'Order Already Exists' },
          { status: 409 }
        );
      } else {
        console.error('An error occurred:', error.message);
        return NextResponse.json(
          { error: 'An unexpected error occurred' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

type SkuWithQuantity = {
  sku: string;
  quantity: number;
};
const mapSkusWithQuantityToOrderItem = async (
  id: number,
  skusWithQuantity: SkuWithQuantity[]
) => {
  const skus: string[] = skusWithQuantity.map(
    (skuWithQuantity) => skuWithQuantity.sku
  );
  const skusProductIdAndMsrp = await getProductAndPriceBySku(skus);
  const orderItems = createOrderItems(
    id,
    skusWithQuantity,
    skusProductIdAndMsrp
  );
  return orderItems;
};

type ProductDetail = {
  id: number;
  sku: string;
  msrp: number | null;
};

type OrderItem = {
  id?: number;
  order_id: number;
  created_at?: Date;
  product_id: number;
  quantity: number;
  price: number;
};

const createOrderItems = (
  order_id: number,
  skusWithQuantity: SkuWithQuantity[],
  skusProductIdAndMsrp: ProductDetail[]
): OrderItem[] => {
  // Create a map of SKU to ProductDetail for quick lookup
  const skuToProductMap = new Map(
    skusProductIdAndMsrp.map((product) => [product.sku, product])
  );

  // Transform skusWithQuantity to the desired order item format
  const orderItems = skusWithQuantity.map(({ sku, quantity }) => {
    const product = skuToProductMap.get(sku);
    if (!product) {
      throw new Error(`No product details found for SKU: ${sku}`);
    }

    const price = Number(product.msrp) * quantity;

    const orderItem: OrderItem = {
      order_id: order_id,
      product_id: product.id,
      quantity: quantity,
      price: price,
    };

    return orderItem;
  });

  return orderItems;
};
