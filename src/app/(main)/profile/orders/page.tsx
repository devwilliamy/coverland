import {
    getAllCompleteOrders,
  } from '@/lib/db/profile/ordersHistory';

export default async function Orders() {
    const orders = await getAllCompleteOrders();
    
    return(
        <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.order_id}</li>
        ))}
      </ul>
)
}