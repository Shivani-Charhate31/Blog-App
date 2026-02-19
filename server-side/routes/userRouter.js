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
const { authMiddlware } = require('../middlewars/auth.middlware')
const userRouter = express.Router();

userRouter.post("/register", userValidation, registerController);
userRouter.post("/login", loginController);
userRouter.get('/authorList', getAuthorController);
userRouter.get("/:id", getUserController);

userRouter.post("/changeAvatar", authMiddlware, changeAvtarController);
userRouter.patch("/edit/user", editUserController);

module.exports = { userRouter };
