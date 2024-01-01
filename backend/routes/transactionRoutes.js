import express from 'express';
import transactionController from '../controllers/transactionController.js';
import authMiddleware from '../middleware/userAuthMiddleware.js';

const router = express.Router();

router.get('/users/:id/transactions', authMiddleware, transactionController.getUserTransactions);
router.post('/users/:id/transactions', authMiddleware, transactionController.borrowBook);
router.put('/users/:id/transactions/:bookId', authMiddleware, transactionController.returnBook);
router.get('/transactions', transactionController.getAllTransactions);

export default router;
 