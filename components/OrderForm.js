import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createOrder, updateOrder } from '../utils/data/orderData';

const initialState = {
  order_name: '',
  customer_name: '',
  phone_number: '',
  email: '',
  order_type: '',
  payment_type: '',
  date: '',
  tip: '',
  order_total: '',
  items: '',
};

function OrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateOrder(formInput).then(() => router.push('/orders/orders'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createOrder(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateOrder(patchPayload).then(() => {
          router.push('/orders/orders');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Order</h2>

      {/* ORDER INPUT FIELDS */}
      <FloatingLabel controlId="floatingInput1" label="Order Name:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter order name"
          name="order_name"
          value={formInput.order_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Customer Name:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter customer name"
          name="customer_name"
          value={formInput.customer_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Phone Number:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter customer phone number"
          name="phone_number"
          value={formInput.phone_number}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Email:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter customer email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput5" label="Order Type:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter order type"
          name="order_type"
          value={formInput.order_type}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput6" label="Payment Type:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter payment type"
          name="payment_type"
          value={formInput.payment_type}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput7" label="Tip:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter tip amount"
          name="tip"
          value={formInput.tip}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput8" label="Order Total:" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter order total:"
          name="order_total"
          value={formInput.order_total}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    order_name: PropTypes.string,
    customer_name: PropTypes.string,
    phone_number: PropTypes.number,
    email: PropTypes.string,
    order_type: PropTypes.string,
    payment_type: PropTypes.string,
    date: PropTypes.string,
    tip: PropTypes.number,
    order_total: PropTypes.number,
    id: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
