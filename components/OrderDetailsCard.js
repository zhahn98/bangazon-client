import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import getItemsByName from '../utils/data/itemData';

export default function OrderDetailsCard({ orderObj }) {
  const [itemDetails, setItemDetails] = useState([]);

  const getOrderItemQuantity = (itemName) => {
    const orderItem = orderObj.items.find((item) => item.name === itemName);
    return orderItem ? orderItem.quantity : 0;
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const items = await getItemsByName(orderObj.items);
        const details = items.map((item) => ({
          name: item.item_name,
          quantity: getOrderItemQuantity(item.item_name),
        }));
        console.warn('Fetched item details:', details);
        setItemDetails(details);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    console.warn('component rendered');
    fetchItemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderObj.items]);

  return (
    <>
      <Card className="text-center">
        <Card.Header>{orderObj.order_name}</Card.Header>
        <Card.Body>
          <p>Customer Name: {orderObj.customer_name}</p>
          <p>Phone number: {orderObj.phone_number}</p>
          <p>Customer Email: {orderObj.email}</p>
          <p>Order Type: {orderObj.order_type}</p>
          <p>Payment Type: {orderObj.payment_type}</p>
          <p>Date: {orderObj.date}</p>
          <p>Items: {itemDetails.map((item) => `${item.name} (${item.quantity})`).join(', ')}</p>
          <p>Tip: {orderObj.tip}</p>
          <p>Order Total: {orderObj.order_total}</p>
          <Link href={`/orders/edit/${orderObj.id}`} passHref>
            <Button variant="warning" className="m-2">
              Edit Order
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

OrderDetailsCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_name: PropTypes.string.isRequired,
    customer_name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    order_type: PropTypes.string.isRequired,
    payment_type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
      }),
    ).isRequired,
    tip: PropTypes.number.isRequired,
    order_total: PropTypes.string.isRequired,
  }).isRequired,
};
