# subscription-billing-app

Features

1. Registration and Login:
   - Users can register for a new account and log in after registration using NextAuth for authentication.

2. Available Plns:
   - Plans are stored in a MongoDB database and fetched using an API route in Next.js.

3. Selecting a Plan and Billing Interval
   - Users can choose a plan and select a billing interval (monthly/yearly).

4. Collecting Credit Card Information:
   - Credit card information is collected securely using Stripe Elements and integrated into the payment form.

5. Creating a Recurring Subscription:
   - Utilizes the Stripe API to create a recurring subscription for the selected plan and billing interval.

6. Displaying Selected Plan Details:
   - After a successful subscription, users can view the details of their selected plan.

7. Canceling a Subscription:
   - Users can cancel their subscription with the provided cancellation button.

Usage
Registration and Login
Visit /auth/register to create a new account and /auth/login to log in with existing credentials.

Available Plans
Navigate to /plans to view the list of available subscription plans.

Selecting a Plan and Billing Interval
Visit /subscribe after logging in.
Choose a plan from the available options.
Select the billing interval (monthly/yearly).
Collecting Credit Card Information
Enter your test credit card information when prompted to complete the subscription process.

