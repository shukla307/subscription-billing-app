//To implement subscription cancellation,components/CancelSubscriptionButton.js

import { useState } from 'react';
import axios from 'axios';

const CancelSubscriptionButton = ({ subscriptionId, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      
      await axios.post('/api/cancel-subscription', { subscriptionId });
      setLoading(false);
     
      onCancel();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleCancel} disabled={loading}>
      {loading ? 'Cancelling...' : 'Cancel Subscription'}
    </button>
  );
};
