const express = require("express");
const {
  registerController,
  loginController,
  getUserController,
  getAuthorController,
  changeAvtarController,
  editUserController,
} = require("../controllers/userController");
const { userValidation } = require('../middlewars/user.validation')

const userRouter = express.Router();

userRouter.post("/register", userValidation, registerController);
userRouter.post("/login", loginController);
userRouter.get("/:id", getUserController);
userRouter.get("/", getAuthorController);
userRouter.post("/changeAvatar", changeAvtarController);
userRouter.patch("/edit/user", editUserController);

module.exports = { userRouter };
