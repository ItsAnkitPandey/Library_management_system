import Transaction from '../models/transactionModel.js';
import {Book} from '../models/bookModel.js';
import { User } from '../models/userModel.js';
                             
const transactionController = {
  getUserTransactions: async (req, res) => {
    try {
      const userId = req.params.id;
      const transactions = await Transaction.find({ user: userId }).populate('book');
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  borrowBook: async (req, res) => {
    try {
      const userId = req.params.id;
      const { bookId } = req.body;

      const book = await Book.findById(bookId);
      if (!book || !book.availabilityStatus) {
        return res.status(400).json({ message: 'Book not available for borrowing.' });
      }

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14); // Assume a 14-day borrowing period

      const transaction = new Transaction({
        user: userId,
        book: bookId,
        dueDate,
        transactionType: 'borrowed',
      });

      await transaction.save();

      // Update book availability status
      book.availabilityStatus = false;
      await book.save();

      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  returnBook: async (req, res) => {
    try {
      const bookId = req.params.bookId; // Use bookId from URL parameters
  
      // Find transactions related to the specified book
      const transactions = await Transaction.find({ book: bookId, transactionType: 'borrowed' }).populate('book');
  
      if (!transactions || transactions.length === 0) {
        return res.status(404).json({ message: 'No borrowed transactions found for the specified book.' });
      }
  
      // Assuming you want to handle multiple transactions (though it's typically one for simplicity)
      for (const transaction of transactions) {
        // Update book availability status
        const book = transaction.book;
        book.availabilityStatus = true;
        await book.save();
  
        // Update transaction details
        transaction.transactionType = 'returned';
        await transaction.save();
      }
  
      res.json({ message: 'Book returned successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } 
  },
  
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find().populate('book user');
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default transactionController;
