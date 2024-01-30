import Book from "../models/book.js";

class BookRepository {
  async save(book) {
    await book.save();
    return book;
  }

  async getAllBooks() {
    return await Book.find({});
  }

  async findById(id) {
    const book = await Book.findById(id);

    if (!book) {
      throw new Error(`Book ${id} not found`);
    }

    return book;
  }

  async updateById(id, data) {
    return await Book.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    await Book.findByIdAndDelete(id);
  }
}

export default BookRepository;
