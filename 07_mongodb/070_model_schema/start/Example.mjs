import {mongoose, Schema} from "mongoose";
import env from "dotenv";
env.config();

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const bookSchema = new Schema({
    title: {type: String, required: true, },
    description: {type: String, required: true, },
    title: {type: String, required: true, },
    rating: {type: Number, required: true, enum: [1,2,3,4,5]},
    comment: {type: String, required: true},
}, {timestamps:true});
const Book = mongoose.model('Book', bookSchema);

const book = new Book({
    title: 'テストブック2',
    description: 'テストディスクリプション',
    comment: 'コメントです。素晴らしい。',
    rating: '4',
});
book.save().then((book) => console.log(book));