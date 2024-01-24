import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1>Welcome to Bangazon!</h1>
      <h5>Sign in to start taking orders.</h5>
      <Button
        type="button"
        size="lg"
        variant="warning"
        className="copy-btn mx-auto"
        onClick={signIn}
        style={{ width: '200px' }}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
