import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
// import ItemCard from '../../components/ItemCard';

function SingleOrder() {
  const [singleOrder, setSingleOrder] = useState({});
  // const [items, setItems] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  // const getAllItems = () => {
  //   getItemsOnSingleOrder(id).then((data) => setItems(data));
  // };

  const deleteThisOrder = () => {
    if (window.confirm('Delete Order?')) {
      deleteOrder(id).then(() => {
        router.push('/orders/orders');
      });
    }
  };

  useEffect(() => {
    getSingleOrder(id)
      .then((data) => setSingleOrder(data));
  // .then(getAllItems);
  }, [id]);

  return (
    <article className="single-event">
      <div>
        <div>
          {/* <Button
            onClick={() => {
              router.push(`/orderrevenues/edit/${singleOrder.id}`);
            }}
          >Close Order
          </Button> */}
        </div>
        <h1>Order Details:</h1>
        <p>Order Name: {singleOrder.order_name}</p>
        <p>Customer Name: {singleOrder.customer_name}</p>
        <p>Customer Email: {singleOrder.email}</p>
        <p>Customer phone: {singleOrder.phone_number}</p>
        <p>Order Type: {singleOrder.order_type}</p>
        <p>Payment Type: {singleOrder.payment_type}</p>
        <p>Date: {singleOrder.date}</p>
        <p>Items: {singleOrder.items}</p>
        <p>Tip: {singleOrder.tip}</p>
        <p>Order Total: {singleOrder.order_total}</p>
        <Button
          onClick={() => {
            router.push(`/orders/edit/${singleOrder.id}`);
          }}
        >Update Info
        </Button>
        <Button className="delete-button" variant="danger" onClick={deleteThisOrder}>Delete Order</Button>
      </div>
      {/* <div>
        <h2>Order Items:</h2>
        {items.map((item) => (
          <section key={`item--${item.id}`} className="item">
            <ItemCard
              itemObj={item}
              onUpdate={getAllItems}
            />
          </section>
        ))}
        Total: ${singleOrder.total_order}
        <Link href={`/orders/add/${id}`} passHref>
          <Button variant="primary" className="add-prods-btn">ADD ITEMS</Button>
        </Link>
      </div> */}
    </article>
  );
}

export default SingleOrder;
