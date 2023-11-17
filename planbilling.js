//Allow users to select a plan and billing interval:

import { useState } from 'react';

const SubscriptionForm = ({ plans, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [billingInterval, setBillingInterval] = useState('monthly');

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleBillingIntervalChange = (event) => {
    setBillingInterval(event.target.value);
  };

  const handleSubscribe = () => {
    // Perform any additional validation or processing before subscribing
    onSubscribe({ plan: selectedPlan, interval: billingInterval });
  };

  return (
    <div>
      <h2>Select a Plan</h2>
      <form>
        <label>
          Choose a Plan:
          <select value={selectedPlan} onChange={handlePlanChange}>
            <option value="" disabled>Select a plan</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name} - ${plan.price} ({plan.interval})
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Billing Interval:
          <select value={billingInterval} onChange={handleBillingIntervalChange}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={handleSubscribe} disabled={!selectedPlan}>
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
