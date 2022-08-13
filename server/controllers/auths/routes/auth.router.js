const express = require("express");
const authRoutes = express.Router();
const { genPasswordHash, validatePassword } = require('../../../utils/genhash.utils');
const User = require('../models/user.model')
const { genJwtToken } = require('../../../utils/jwttoken.utils')

let errorMessage = {
  status: 422,
  message: 'Invalid user credentials'
}

authRoutes.post("/signup", async (req, response) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  try {
    const oldUser = await User.findOne({ email })
    if (oldUser) {
      errorMessage.message = 'User Already exist. Please Login'
      return response.status(400).send(errorMessage.message)
    }
    hashedPassword = await genPasswordHash(password, 10)
    const payload = {
      fullname: req.body.firstName + req.body.lastName,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      token: ''
    };
    const user = await User.create(payload);
    const token = genJwtToken(user._id, email)
    user.token = token
    return response.status(201).send(user)
  } catch (err) {
    console.error('err',err)
    return response.status(400).send(err)
  }
});


authRoutes.post("/signin", async (req, response, error) => {
  const loginPassword = req.body.password;
  const username = req.body.email.toLowerCase()
  try {
    const query = await User.findOne({ email: username })
    const { password, ...authUser } = query
    const validatedUser = await validatePassword(loginPassword, password)
    if (validatedUser && username) {
      const { _doc: { password, ...user } } = authUser
      const token = genJwtToken(user._id, username)
      user.token = token
      return response.status(200).send(user)
    }
    return response.status(errorMessage.status).send(errorMessage.message)
  } catch (err) {
    return response.status(400).send(err)
  }
});



module.exports = authRoutes;