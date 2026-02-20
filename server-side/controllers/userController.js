const { userModel } = require('../models/userSchema')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

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
    return res.status(201).json({ data: newUser, messg: 'New User Register' })


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
    let isUser = await userModel.findOne({ email: newEmail })
    if (!isUser) {
      return res.status(422).json({ error: 'User Not FoundS' })
    }
    const isPasswordExisting = bcrypt.compareSync(password, isUser.password)

    if (!isPasswordExisting) {
      return res.status(422).json({ error: 'Invalid Password' })
    }
    const key = process.env.JWTKEY
    const token = JWT.sign({ id: isUser._id, name: isUser.name }, key, { expiresIn: '1d' })

    return res.status(201).json({ data: { isUser, token }, messg: 'User Login' })
  }
  catch (error) {
    console.log(error)
    return res.status(422).json({ error: ' Invalid Crendentials Login failed ' })
  }
};

const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select('-password')
    if (!user) {
      return res.status(422).json({ messg: 'User Not Exist' })
    }
    return res.status(201).json({ data: user })

  } catch (error) {
    console.log(error)
    return res.status(422).json({ error: ' Internal Server Error ' })
  }
};
const getAuthorController = async (req, res) => {
  try {
    const authors = await userModel.find().select('-password')
    if (!authors) {
      return res.status(422).json({ messg: 'No Author Found' })
    }
    return res.status(201).json({ data: authors, mssg: ' Authors List' })

  }
  catch (error) {
    console.log(error)
    return res.status(422).json({ error: ' Internal Server Error ' })
  }
};

const changeAvtarController = async (req, res) => {
  try {

    if (!req.files && !req.files.avtar) {
      return res.status(422).json({ error: 'Please upload the img' })
    }
    const user = await userModel.findById(req.user.id)

    // if already img delete that one n add new one


    const { avatar } = req.files;

    if (avatar.size > 500000) {
      console.log("00000")
      return res.status(422).json({ error: "Profile picture toobig. Should be less than 50kb" })

    }

  } catch (error) {
    console.log(error)
    return res.status(422).json({ error: ' Internal Server Error ' })
  }
};

const editUserController = (req, res) => {


};



module.exports = {
  registerController,
  loginController,
  changeAvtarController,
  getUserController,
  getAuthorController,
  editUserController,
};
