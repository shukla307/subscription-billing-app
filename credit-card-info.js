//Collect credit card information using Stripe Elements:

//npm install @stripe/react-stripe-js @stripe/stripe-js

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ onPaymentSubmit }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // for Pass the token 
      onPaymentSubmit(token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </label>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Submit Payment'}
      </button>
    </form>
  );
};

export default PaymentForm;
