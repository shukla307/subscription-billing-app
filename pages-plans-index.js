//Display plans on a page

// pages/plans/index.js

import { useEffect, useState } from 'react';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        const data = await response.json();
        setPlans(data.plans);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <h2>Available Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            {plan.name} - ${plan.price} ({plan.interval})
          </li>
        ))}
      </ul>
    </div>
  );
};
