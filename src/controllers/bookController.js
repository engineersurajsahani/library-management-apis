const Book = require('../models/Book');
const books = [];

const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find();
    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getBookById = async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      {
        return response.status(404).json({ message: 'Book not found' });
      }
    }
    response.status(200).json(book);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const createBook = async (request, response) => {
  try {
    if (request.user.role === 'STUDENT') {
      return response
        .status(403)
        .json({ message: 'You are not authorized to create a book' });
    }

    const { title, author, publishedYear, price, quantity } = request.body;

    if (!title || !author || !publishedYear || !price || !quantity) {
      return response
        .status(400)
        .json({ message: 'Please provide all the required fields' });
    }

    const newBook = {
      id: books.length + 1,
      title,
      author,
      publishedYear,
      price,
      quantity,
      status: 'Available',
    };

    const book = new Book(newBook);
    await book.save();
    response
      .status(201)
      .json({ message: 'Book created successfully', data: newBook });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const uppdateBook = async (request, response) => {
  try {
    if (request.user.role === 'STUDENT') {
      return response
        .status(403)
        .json({ message: 'You are not authorized to update a book' });
    }

    const book = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!book) {
      {
        return response.status(404).json({ message: 'Book not found' });
      }
    }
    response
      .status(200)
      .json({ message: 'Book updated successfully', data: book });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const deleteBook = async (request, response) => {
  try {
    if (request.user.role === 'STUDENT') {
      return response
        .status(403)
        .json({ message: 'You are not authorized to delete a book' });
    }

    const book = await Book.findByIdAndDelete(request.params.id);
    if (!book) {
      {
        return response.status(404).json({ message: 'Book not found' });
      }
    }
    response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  uppdateBook,
  deleteBook,
};
