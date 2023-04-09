import express from 'express';

const PORT = 8800;
const app = express();
app.use(express.json());

app.get('/', function(req, res) {
    res.send({message:"hello", array:['shino','norihiro','カンセロ']});
})

app.listen(PORT, function() {
    console.log(`Server start: http://localhost:${PORT}`)
});
