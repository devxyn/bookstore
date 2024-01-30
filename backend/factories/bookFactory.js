import Book from "../models/book.js";

class BookFactory {
  createBook(title, author, yearReleased, genre) {
    return new Book({ title, author, yearReleased, genre });
  }
}

export default BookFactory;
