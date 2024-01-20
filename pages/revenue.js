import React, { useState, useEffect } from 'react';
import { getOrders } from '../utils/data/orderData';

// Create the OrderTotalSumPage component
function OrderTotalSumPage() {
  const [orderTotalSum, setOrderTotalSum] = useState(0);
  const [tipsSum, setTipsSum] = useState(0);

  useEffect(() => {
    // Fetch order data
    getOrders()
      .then((orders) => {
        // Calculate the sum of order_total values
        const sum = orders.reduce((total, order) => total + parseFloat(order.order_total), 0);
        setOrderTotalSum(sum);

        // Calculate the sum of tips
        const tips = orders.reduce((total, order) => total + parseFloat(order.tip), 0);
        setTipsSum(tips);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  }, []); // Run the effect only once on component mount

  return (
    <div>
      <h2 className="text-center">Revenue:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sum of Order Totals</td>
            <td>${orderTotalSum.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Tips Earned</td>
            <td>${tipsSum.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Revenue + Tips</td>
            <td><b>${(tipsSum + orderTotalSum).toFixed(2)}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderTotalSumPage;
