import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    tran_id: {
      type: Number,
      unique: true,   
    },
    val_id: {
      type: String,
    },
    amount: {
      type: String,
    },
    card_type: {
      type: String,
    },
    store_amount: {
      type: String,
    },
    bank_tran_id: {
      type: String,
    },
    status: {
      type: String,
    },
    tran_date: {
      type: Date,
      default: Date.now,
    },
    card_issuer: {
      type: String,
    },
    card_brand: {
      type: String,
    },
    risk_level: {
      type: String,
    },
    risk_title: {
      type: String,
    }, 
    cus_name :{
      type: String, 
    },

    cus_email:{
      type : String
    }, 
    purchaseCourse :{
      type :Array
    }
   
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
