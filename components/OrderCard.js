import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function OrderCard({ orderObj }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{orderObj.order_name}</Card.Header>
        <Card.Body>
          <p>Customer Name: {orderObj.customer_name}</p>
          <p>Phone number: {orderObj.phone_number}</p>
          <Link href={`/orders/${orderObj.id}`} passHref>
            <Button variant="success" className="m-2">
              View Details
            </Button>
          </Link>
          <Button variant="warning" className="m-2">
            Edit Order
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_name: PropTypes.string.isRequired,
    customer_name: PropTypes.string.isRequired,
    phone_number: PropTypes.number.isRequired,
  }).isRequired,
};
