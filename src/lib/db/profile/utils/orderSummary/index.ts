/* This File is used to create a summary of the order. */

import {
    TUserOrders,
    TOrderItem,
    TOrderItemProduct,
    TInitialOrderItemsDataDB,
    TInitialOrdersDataDB,
    TInitialProductDataDB,
  } from '@/lib/db/profile/ordersHistory';

export const getOrderSubtotal = (order: TInitialOrdersDataDB): number => {
    let subtotal = 0;
    order.items?.forEach(item => {
        subtotal += item.product?.price * item.quantity;
    });
    return subtotal;
}

export const getOrderItemDiscount = (item: TInitialOrderItemsDataDB): number => {
    return parseFloat(item.product?.discount * item.quantity).toFixed(2);
}

export const getProductDiscount = (product: TInitialProductDataDB): number => {
    return parseFloat(product.price - product.msrp).toFixed(2);
}

export const getOrderTotalDiscount = (order: TInitialOrdersDataDB): number => {
    let totalDiscount = 0;
    order.items?.forEach(item => {
        totalDiscount += item.product.discount * item.quantity; // neither item nor product has a discount property
    });
    return parseFloat(totalDiscount).toFixed(2);
}
