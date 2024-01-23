import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <h4>Welcome to Bangazon, and get ready to take some orders!</h4>
      <Link href="/orders/new" passHref>
        <Button variant="success" type="button" size="lg" style={{ margin: '5px' }}>New Order</Button>
      </Link>
      <Link href="/orders/orders" passHref>
        <Button variant="danger" type="button" size="lg" style={{ margin: '5px' }}>View Orders</Button>
      </Link>
      <Link href="/revenue" passHref>
        <Button variant="warning" type="button" size="lg" style={{ margin: '5px' }}>Revenue</Button>
      </Link>
    </div>
  );
}

export default Home;
