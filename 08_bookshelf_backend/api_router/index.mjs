import express from "express";
import booksRouter from "./books.mjs";

const apiRouter = express.Router();
apiRouter.use('/books', booksRouter);

export default apiRouter;