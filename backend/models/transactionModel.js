import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'books',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['borrowed', 'returned'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
