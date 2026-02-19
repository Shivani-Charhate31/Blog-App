const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const { userRouter } = require("./routes/userRouter");
const { postRouter } = require("./routes/postRouter");
const { dbConnect } = require("./config/dbConfig");

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => {
  dbConnect();
  console.log(`App listening on Port ${port}`);
});
