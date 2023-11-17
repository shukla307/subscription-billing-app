pages/api/subscribe.js

Creating a recurring subscription with Stripe involves using the Stripe API to create a subscription object based on the user's selected plan and billing interval.


// pages/api/subscribe.js

import { getSession } from 'next-auth/react';
import dbConnect from '../../utils/dbConnect';
import Subscription from '../../models/Subscription';
import stripe from 'stripe';

const stripeSecretKey = 'your_stripe_secret_key'; // Replace with your actual Stripe secret key
const stripe = new stripe(stripeSecretKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { planId, interval } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: session.user.email,
      source: 'tok_visa', // This is a test token, replace with the actual token obtained from the client
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: planId }],
      billing: interval === 'yearly' ? 'year' : 'month',
      // Additional options like trial period, metadata, etc.
    });

    // Save subscription details in your database
    await dbConnect();
    await Subscription.create({
      userId: session.user.id,
      subscriptionId: subscription.id,
      planId,
      interval,
    });

    return res.status(200).json({ subscription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create subscription' });
  }
}
