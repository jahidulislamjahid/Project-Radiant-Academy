import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    tran_id: {
      type: Number,
      required: true, // Ensures the transaction ID is required
      unique: true,   // Ensures no duplicate transaction IDs
    },
    val_id: {
      type: String,
      required: true, // Ensure this value is present
    },
    amount: {
      type: String,
      required: true, // Store the payment amount
    },
    card_type: {
      type: String,
      required: true, // Store the card type
    },
    store_amount: {
      type: String,
      required: true, // Store the store amount
    },
    bank_tran_id: {
      type: String,
      required: true, // Store the bank transaction ID
    },
    status: {
      type: String,
      required: true, // Store the status of the transaction
    },
    tran_date: {
      type: Date,
      required: true, // Store the transaction date
      default: Date.now,
    },
    card_issuer: {
      type: String,
      required: true, // Store the card issuer
    },
    card_brand: {
      type: String,
      required: true, // Store the card brand
    },
    risk_level: {
      type: String,
      required: true, // Store the risk level
    },
    risk_title: {
      type: String,
      required: true, // Store the risk title
    },
    cus_email: {
      type: String,
      required: true, // Store the risk title
    },
    // Add more fields if necessary
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
