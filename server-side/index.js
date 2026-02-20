const express = require("express");
const upload = require('express-fileupload');
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");



const { userRouter } = require("./routes/userRouter");
const { postRouter } = require("./routes/postRouter");
const { dbConnect } = require("./config/dbConfig");

const app = express();
// middlewars

app.use(upload());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
// location where img store
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => {
  dbConnect();
  console.log(`App listening on Port ${port}`);
});
