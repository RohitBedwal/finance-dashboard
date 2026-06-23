import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      required: false,

    },
    amount: {
      type: Number,
      required: true,
    },
    category: String,
    currency: {
      type: String,
      default: "INR",
    },
    date: Date,
    method: String,
    name: String,
    status: {
      type: String,
      default: "Successful",
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Transaction",
  transactionSchema
);