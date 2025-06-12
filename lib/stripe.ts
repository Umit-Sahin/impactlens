// app/lib/stripe.ts

import Stripe from 'stripe';

// Versiyon kontrolü: https://stripe.com/docs/api/versioning
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
