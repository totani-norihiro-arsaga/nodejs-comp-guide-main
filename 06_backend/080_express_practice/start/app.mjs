import express from "express";

const PORT = 8080;
const app = express();
app.use(express.urlencoded());

app.get("/", function (req, res) {
  res.send(`
    <h1>練習問題</h1>
    <p>下記のフォームで送信したリクエストを「商品1、商品2がカートに追加されました。」のようなレスポンスとして返却する処理を記述しましょう</p>
    <form action="/cart" method="POST">
    <div>
      <label>商品：<input type="text" name="product[]"></label>
    </div>
    <div>
      <label>商品：<input type="text" name="product[]"></label>
    </div>
    <input type="submit">
    </form>
    `);
});

app.post("/cart", function (req, res) {
  const param = req.body;
  console.log(param);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
      <p>「${param.product[0]}、${param.product[1]}がカートに追加されました。」</p>
      </body>
    </html>
  `);
});

app.listen(PORT, function(){
  console.log(`server start http://localhost:8080`)
});
