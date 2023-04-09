import express, { urlencoded } from "express";
import env from "dotenv";
import apiRouter from "./api_router/index.mjs";
env.config();
const port = process.env.PORT ?? 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api', apiRouter);

app.use(function(err, req, res, next) {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).send({message:err});
})

app.listen(port, () => {
    console.log(`server start localhost://${port}`)
});