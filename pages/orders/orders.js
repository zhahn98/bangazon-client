import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const getAllOrders = () => {
    getOrders(user.uid).then((data) => setOrders(data));
  };

  useEffect(() => {
    getAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="events">
      <h1>All orders</h1>
      {orders.map((order) => (
        <section key={`event--${order.id}`} className="order">
          <OrderCard orderObj={order} />
        </section>
      ))}
    </article>
  );
}

export default OrdersPage;
