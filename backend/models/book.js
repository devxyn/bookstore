import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  yearReleased: Number,
  genre: [String],
});

const Book = model("Book", bookSchema);

export default Book;
