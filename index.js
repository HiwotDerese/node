//es5 we can use es6
//in express the server is it self
const express = require('express');
const mongoose = require('mongoose');
// const morgan = require("morgan");

const userRouter = require("./src/routes/user")
const bookRouter = require("./src/routes/book")

require('dotenv').config('./.env')
//instantiate express object called app
const app = express();
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/Book_collection", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(()=>{
    console.log("connected to database")
});
const port = 3000;

// app.use("/", () => {
//     console.log(`Hello worlds`);
// })
// to define route
//get first the path""/" then handller or callback()=>
// app.get("/", (req, res)=> {
//     res.json({
//         name : "hiwot"
//     })
    // console.log(req);
    // res.send("Hey frontend")
// })

// app.put("/", (req, res) => {
//     res.send("<h1>hello</h1>");
// });
// app.get("/bootcamp", (req, res) => {
//     res.send("<h1> get</h1>");
// });



app.use("/users", userRouter)
app.use("/books", bookRouter)
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

