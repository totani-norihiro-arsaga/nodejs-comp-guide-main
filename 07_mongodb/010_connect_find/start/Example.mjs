import * as dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function getCollection() {
    try{
        await client.connect()
        const bookshelf = client.db('bookshelf');
        return bookshelf.collection('books');
    } catch {
        client.close();
    }
}

async function getBooks() {
  const books = await getCollection();
//   const cursor = books.find({rating: 5});
  const cursor = books.find({rating: {$gte: 2, $lte: 4}});
  const result = await cursor.toArray();
  console.log(result);

  await client.close();
}

getBooks();



