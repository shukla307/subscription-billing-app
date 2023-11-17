//Integrate the CancelSubscriptionButton in  main component :

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import CancelSubscriptionButton from '../components/CancelSubscriptionButton';

const SubscriptionDetails = () => {
  const { data: session } = useSession();
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axios.get('/api/subscription');
        setSubscriptionDetails(response.data.subscription);
      } catch (error) {
        console.error(error);
      }
    };

    if (session) {
      fetchSubscriptionDetails();
    }
  }, [session]);

  const handleCancel = () => {
    
    console.log('Subscription canceled!');
  };

  return (
    <div>
      {subscriptionDetails ? (
        <div>
          <h2>Subscription Details</h2>
          <p>Plan: {subscriptionDetails.planName}</p>
          <p>Billing Interval: {subscriptionDetails.interval}</p>>.
          <CancelSubscriptionButton
            subscriptionId={subscriptionDetails.subscriptionId}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <p>No subscription details available.</p>
      )}
    </div>
  );
};

export default SubscriptionDetails;
