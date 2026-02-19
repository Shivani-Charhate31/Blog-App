const { userModel } = require('../models/userSchema')
const bcrypt = require('bcrypt')

const registerController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password) {
      return res.status(422).json({ error: 'All fields are Mandatory' })
    }
    const newEmail = email.toLowerCase();
    const isExistingEmail = await userModel.findOne({ email: newEmail });
    if (isExistingEmail) {
      return res.status(422).json({ error: 'Email already Exits' })
    }
    if (password !== confirmPassword) {
      return res.status(422).json({ error: 'Password not Match' })
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = await userModel.create({ name, email: newEmail, password: hashPassword })
    return res.status(201).json({ newUser, messg: 'New User Register' })


  } catch (error) {
    console.log(error)
    return res.status(422).json({ error: 'User Registation failed ' })
  }

};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(422).json({ error: 'Enter All Details' })
    }
    const newEmail = email.toLowerCase()
    const isUser = await userModel.findOne({ email: newEmail })
    if (!isUser) {
      return res.status(422).json({ error: 'Invalid Crendentials' })
    }

    const correctPassword = bcrypt.compare(password, isUser.password)
    if (!correctPassword) {
      return res.status(422).json({ error: 'Invalid Crendentials' })
    }
    console.log(isUser)
  }
  catch (error) {
    console.log(error)
    return res.status(422).json({ error: 'Login failed ' })
  }
};

const getUserController = (req, res) => { };

const changeAvtarController = (req, res) => { };

const editUserController = (req, res) => {
  res.send("Response from editUserController ");
};

const getAuthorController = (req, res) => { };

module.exports = {
  registerController,
  loginController,
  changeAvtarController,
  getUserController,
  getAuthorController,
  editUserController,
};
