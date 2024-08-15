import { supabaseAdminPanelDatabaseClient } from '../adminPanelSupabaseClient';
import { ADMIN_PANEL_ORDERS } from '../constants/databaseTableNames';

export async function getAllAdminPanelOrders() {
  const { data, error } = await supabaseAdminPanelDatabaseClient
    .from(ADMIN_PANEL_ORDERS)
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAdminPanelOrderById(orderId: string) {
  try {
    const { data, error } = await supabaseAdminPanelDatabaseClient
      .from(ADMIN_PANEL_ORDERS)
      .select('*')
      .eq('order_id', orderId) // Ensure the column name matches your table's ID column
      .single(); // Use .single() to fetch exactly one record

    if (error) {
      throw new Error(
        `[getAdminPanelOrderById]: Failed to fetch order with ID: ${orderId}. ${error.message}`
      );
    }

    return data;
  } catch (error) {
    console.error(
      `[getAdminPanelOrderById]: An unexpected error occurred`,
      error
    );
    throw new Error(
      `[getAdminPanelOrderById]: An unexpected error occurred ${error}`
    );
  }
}

type GetOrderSequenceParams = {
  productType: string;
  date: string;
};

export async function getOrderIdSequence({
  productType,
  date,
}: GetOrderSequenceParams) {
  const { data, error } = await supabaseAdminPanelDatabaseClient.rpc(
    'get_next_sequence',
    {
      p_type: productType,
      p_date: date,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const postAdminPanelOrder = async (order) => {
  try {
    const { data, error } = await supabaseAdminPanelDatabaseClient
      .from(ADMIN_PANEL_ORDERS)
      .insert(order);
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

export const updateAdminPanelOrder = async (order, order_id) => {
  if (!order_id) {
    console.error('Order ID is required');
    return;
  }

  try {
    const { data, error } = await supabaseAdminPanelDatabaseClient
      .from(ADMIN_PANEL_ORDERS)
      .update(order)
      .match({ order_id })
      .select('*');

    if (error) {
      if (Number(error.code) === 23505) {
        console.error('Order Already Exists');
      } else {
        console.error('An error occurred:', error.message);
      }
    }

    if (data && data?.length === 0) {
      console.error('No order found with the specified ID');
    }
    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};
