import Book from "../models/book.mjs";
import { validationResult } from "express-validator";

async function getAllBooks(req, res) {
  const books = await Book.find();
  res.send(result);
}
async function getBookById(req, res) {
  const id = req.params.id;
  const book = await Book.findById(id).exec();
  if(book === null) {
    return res.status(404).send({message:'存在しないデータです。'})
  }
  res.send(book);
}
async function registBook(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const errs = errors.array();
        res.status(404).send(errs);
    }
  const body = req.body;
  const book = new Book({
    title: body.title,
    description: body.description,
    rating: body.rating,
    comment: body.comment,
  });
  const insertedBook = book.save();
  res.send(insertedBook);
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const {deletedCount} = await Book.deleteOne({ _id: id });
  if (deletedCount !== 0) {
    res.send({ message: "削除しました。" });
  } else {
    res.send({ message: "削除できませんでした。" });
  }
  return result;
}

async function updateBook(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty) {
    const errs = errors.array();
    return res.status(404).send({message:errs});
  }
    const id = req.params.id;
  const selectedBook = await Book.findById(id).exec();
  if(selectedBook === null) {
    return res.status(404).send({message:"データが存在しないです。"});
  }
  const { title, description, rating, comment } = req.body;
  if (title !== undefined) selectedBook.title = title;
  if (description !== undefined) selectedBook.description = description;
  if (rating !== undefined) selectedBook.rating = rating;
  if (comment !== comment) selectedBook.comment = comment;
  const result = await selectedBook.save();
  res.send(result);
}

export { getAllBooks, getBookById, deleteBook, registBook, updateBook };
