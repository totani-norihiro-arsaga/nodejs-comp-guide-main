import * as http from "http";

const server = http.createServer(function (req, res) {
  const path = req.url;
  const result = path.replace('/','');
  console.log(path);
    res.end(result);  
});

server.listen(8080);