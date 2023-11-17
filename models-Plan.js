//Define a MongoDB model for billing plans:

// models/Plan.js

import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  interval: { type: String, enum: ['monthly', 'yearly'], required: true },
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
