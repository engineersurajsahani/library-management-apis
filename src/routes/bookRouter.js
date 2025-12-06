const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  uppdateBook,
  deleteBook,
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, uppdateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
