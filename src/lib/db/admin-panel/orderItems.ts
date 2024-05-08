import { supabaseAdminPanelDatabaseClient } from '../adminPanelSupabaseClient';
import { ADMIN_PANEL_ORDER_ITEMS } from '../constants/databaseTableNames';
import { getProductAndPriceBySku } from './products';

type SkuWithQuantity = {
  sku: string;
  quantity: number;
};
const mapSkusWithQuantityToOrderItem = async (
  id: number,
  skusWithQuantity: SkuWithQuantity[]
) => {
  console.log("[mapSkusWithQuantityToOrderItem] skusWithQuantity", skusWithQuantity)
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

export const postAdminPanelOrderItem = async (
  id: number,
  skusWithQuantity: string
) => {
  const orderItems = await mapSkusWithQuantityToOrderItem(
    id,
    JSON.parse(skusWithQuantity)
  );

  try {
    const { data, error } = await supabaseAdminPanelDatabaseClient
      .from(ADMIN_PANEL_ORDER_ITEMS)
      .insert(orderItems);

    if (error) {
      if (Number(error.code) === 23505) {
        console.error('Order Already Exists');
      } else {
        console.error('An error occurred:', error.message);
      }
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};
