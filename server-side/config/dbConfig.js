const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_URL;
console.log(url);

const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Server is up DB Connected .....");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConnect };
