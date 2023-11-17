export default CancelSubscriptionButton;

//Creating an API route for subscription cancellation (pages/api/cancel-subscription.js):
// pages/api/cancel-subscription.js

import { getSession } from 'next-auth/react';
import dbConnect from '../../utils/dbConnect';
import Subscription from '../../models/Subscription';
import stripe from 'stripe';

const stripeSecretKey = 'your_stripe_secret_key'; 
const stripe = new stripe(stripeSecretKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { subscriptionId } = req.body;

  try {
    // Using the Stripe API to cancel the subscription
    const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    //database 
    await dbConnect();
    await Subscription.findOneAndUpdate(
      { subscriptionId: canceledSubscription.id },
      { status: 'canceled' }
    );

    return res.status(200).json({ message: 'Subscription canceled successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to cancel subscription' });
  }
}
