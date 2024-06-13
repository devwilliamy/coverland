// app/order/[order_id]/page.tsx
import {
    TUserOrders,
    TOrderItem,
    TOrderItemProduct,
    TInitialOrderItemsDataDB,
    TInitialOrdersDataDB,
    TInitialProductDataDB,
    fetchUserRecentOrders,
  } from '@/lib/db/profile/ordersHistory';

  type OrderDetailProps = {
    params: { orderId: string };
  };
  
  const OrderDetailPage = async ({ params }: OrderDetailProps) => {
    const orders: TInitialOrdersDataDB[] = await fetchUserRecentOrders(4); // Adjust the quantity as needed
    const order = orders.find(order => order.id.toString() === params.orderId);
  
    if (!order) {
      return <div>Order not found</div>;
    }
  
    return (
      <div>
        <h1>Order Details for Order ID: {order.id}</h1>
        {/* <p>Total Amount: {order.total_amount}</p>
        <p>Payment Date: {order.payment_date}</p>
        <h2>Items:</h2>
        <ul>
          {order.items.map(item => (
            <li key={item.id}>
              <p>Product: {item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}</p>
            </li>
          ))}
        </ul> */}
      </div>
    );
  };
  
  export default OrderDetailPage;