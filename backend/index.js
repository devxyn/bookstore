import express from "express";
import process from "node:process";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config.js";
import BookFactory from "./factories/bookFactory.js";
import BookRepository from "./repositories/bookRepository.js";

const app = express();
const port = process.env.PORT || 3000;
const { connect } = mongoose;

await connect(process.env.DB_URL, {
  dbName: process.env.DB_NAME,
});

app.use(bodyParser.json());

const bookFactory = new BookFactory();
const bookRepository = new BookRepository();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// POST - Add books - /addBooks
app.post("/addBooks", async (req, res) => {
  // Get the student data from the req body (req.body)
  const { title, author, yearReleased, genre } = req.body;
  // Create a new student object with the data
  const book = bookFactory.createBook(title, author, yearReleased, genre);
  // Add the student to the students array
  await bookRepository.save(book);
  // Response with a success message
  res.status(201).json({ message: "The book has been created successfully!", book });
});

// GET - Get all books - /books/
app.get("/books", async (req, res) => {
  res.status(200).json({ data: await bookRepository.getAllBooks() });
});

// GET - Get a book - /book/:bookId
app.get("/book/:id", async (req, res) => {
  try {
    const book = await bookRepository.findById(req.params.id);
    res.status(200).json({ data: book });
  } catch (e) {
    res.status(404).json({ message: e.message || "The book does not exist." });
  }
});
// PATCH - Patch a book - /book/:bookId
app.patch("/book/:id", async (req, res) => {
  try {
    const book = await bookRepository.updateById(req.params.id, req.body);
    res.status(200).json({ message: "The book has been updated successfully!", data: book });
  } catch (error) {
    res.status(404).json({ message: error.message || "The book doesn't exist." });
  }
});

// DELETE - Delete a book - /book/:bookId
app.delete("/book/:id", async (req, res) => {
  try {
    await bookRepository.deleteById(req.params.id);
    res.status(204).json({});
  } catch (error) {
    res.status(404).json({ message: error.message || "The book does not exist." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
