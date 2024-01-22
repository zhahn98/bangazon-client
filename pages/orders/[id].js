import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
import { getItemsByIds } from '../../utils/data/itemData';

function SingleOrder() {
  const [singleOrder, setSingleOrder] = useState({});
  const [itemNames, setItemNames] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const deleteThisOrder = () => {
    if (window.confirm('Delete Order?')) {
      deleteOrder(id).then(() => {
        router.push('/orders/orders');
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await getSingleOrder(id);
        setSingleOrder(orderData);
        // Fetch item names
        const itemsData = await getItemsByIds(orderData.items);
        const names = itemsData.map((item) => item.item_name);
        setItemNames(names);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <article className="single-event">
      <div>
        <div className="text-center mt-3">
          <h1>Order Details:</h1>
        </div>
        <Card className="text-center mx-auto col-md-5">
          <Card.Header>Order Name: {singleOrder.order_name}</Card.Header>
          <p>Customer Name: {singleOrder.customer_name}</p>
          <p>Customer Email: {singleOrder.email}</p>
          <p>Customer phone: {singleOrder.phone_number}</p>
          <p>Order Type: {singleOrder.order_type}</p>
          <p>Payment Type: {singleOrder.payment_type}</p>
          <p>Date: {singleOrder.date}</p>
          <p>Items: {itemNames.join(', ')}</p>
          <p>Tip: {singleOrder.tip}</p>
          <p>Order Total: {singleOrder.order_total}</p>
        </Card>
        <div className="text-center mt-3">
          <Button
            onClick={() => {
              router.push(`/orders/edit/${singleOrder.id}`);
            }}
          >
            Update Info
          </Button>
          <Button className="delete-button" variant="danger" onClick={deleteThisOrder}>
            Delete Order
          </Button>
        </div>
      </div>
    </article>
  );
}

export default SingleOrder;
