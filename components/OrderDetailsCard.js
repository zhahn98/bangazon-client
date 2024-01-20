import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function OrderDetailsCard({ orderObj }) {
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
          <p>Items: {orderObj.items}</p>
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
    phone_number: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    order_type: PropTypes.string.isRequired,
    payment_type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    items: PropTypes.string.isRequired,
    tip: PropTypes.number.isRequired,
    order_total: PropTypes.string.isRequired,
  }).isRequired,
};
