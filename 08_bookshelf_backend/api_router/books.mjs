import express from "express";
import {
  getAllBooks,
  getBookById,
  registBook,
  deleteBook,
  updateBook,
} from "../Controller/BooksController.mjs";
import { body } from "express-validator";
import { errorHandler } from "./helper.mjs";

const booksRouter = express.Router();
booksRouter.use(express.json());
booksRouter.use(express.urlencoded({ extended: true }));

booksRouter.get("/", errorHandler(getAllBooks));

booksRouter.get("/:id", errorHandler(getBookById));

booksRouter.post(
  "/",
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("rating").notEmpty(),
  body("comment").notEmpty(),
  body("rating").notEmpty().isInt({ min: 1, max: 5 }),
  errorHandler(registBook)
);

booksRouter.delete("/:id", errorHandler(deleteBook));

booksRouter.patch(
  "/:id",
  body("title").optional().notEmpty(),
  body("description").optional().notEmpty(),
  body("rating").optional().notEmpty(),
  body("comment").optional().notEmpty(),
  body("rating").optional().notEmpty().isInt({ min: 1, max: 5 }),
  errorHandler(updateBook)
);

export default booksRouter;