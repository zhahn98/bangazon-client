import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createOrder, updateOrder } from '../utils/data/orderData';
import { getMenuItems } from '../utils/data/itemData';

const initialState = {
  order_name: '',
  customer_name: '',
  phone_number: 0,
  email: '',
  order_type: '',
  payment_type: '',
  date: '',
  tip: '',
  order_total: '',
  id: null,
  items: [],
};

function OrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Fetch menu items when the component mounts
    getMenuItems()
      .then((items) => setMenuItems(items))
      .catch((error) => console.error('Error fetching menu items:', error));
    // Set initial state in form fields if EDITING
    if (obj && obj.id !== undefined) {
      setFormInput((prevState) => ({
        ...prevState,
        ...obj,
        items: obj.items.map((item) => item.item_name),
      }));
    }
  }, [obj]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'quantity') {
      // Update the quantity for the specified menu item
      const updatedItems = [...formInput.items];
      const existingItem = updatedItems[index];

      if (existingItem) {
        updatedItems[index] = { ...existingItem, quantity: value };
      } else {
        // If the item doesn't exist in the array, create a new one
        updatedItems[index] = { name: menuItems[index].item_name, quantity: value };
      }

      setFormInput((prevState) => ({
        ...prevState,
        items: updatedItems,
      }));
    } else {
      // Update other form fields
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchedMenuItems = await getMenuItems();

      if (fetchedMenuItems.length === 0) {
        console.error('Error: No menu items fetched.');
        return;
      }

      const itemIDs = formInput.items.map((menuItem) => {
        if (!menuItem || !menuItem.name) {
          return null;
        }

        const foundItem = fetchedMenuItems.find((item) => item.item_name === menuItem.name);

        if (!foundItem) {
          console.error(`Error: Menu item not found for ${menuItem.name}`);
          return null;
        }

        return foundItem.id;
      });

      // Filter out any null values (menu items not found or undefined name)
      const filteredItemIDs = itemIDs.filter((item) => item !== null);

      const updatedFormInput = { ...formInput, items: filteredItemIDs };

      if (obj.id) {
        // Update existing order
        await updateOrder(updatedFormInput);
        router.push('/orders/orders');
      } else {
        // Create new order
        const payload = { ...updatedFormInput, uid: user.uid };
        await createOrder(payload);
        router.push('/orders/orders');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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

      <h3 className="text-white mb-3">Order Items:</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem, index) => (
            <tr key={menuItem.id}>
              <td>
                <Form.Label htmlFor={`quantityInput-${index}`}>{menuItem.item_name}</Form.Label>
              </td>
              <td>
                <FloatingLabel controlId={`quantityInput-${index}`} label={`Quantity for ${menuItem.item_name}`}>
                  <Form.Control
                    type="number"
                    min="0"
                    name="quantity"
                    value={formInput.items[index]?.quantity || 0}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </FloatingLabel>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    tip: PropTypes.string,
    order_total: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
