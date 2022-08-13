const { genPasswordHash, validatePassword } = require('../utils/genhash.utils');
const User = require('./users/models/users.model')
const { genJwtToken } = require('../utils/jwttoken.utils')
const passportConfig =  require('../config/passport.config')
const { errorMessage } = require('../utils/common.utils')

exports.register = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  try {
    hashedPassword = await genPasswordHash(password, 10)
    const payload = {
      fullname: req.body.firstname + req.body.lastname,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: email.toLowerCase(),
      interest: req.body.interest,
      password: hashedPassword,
      token: ''
    };
    const user = await User.create(payload);
    return res.json(user)
  } catch (err) {
    errorMessage.message = err.message
    return res.json(errorMessage)
  }
}

exports.login = (req, res) => {
  try {  
    if (req.isAuthenticated()) {
    const { _id, email, firstname, lastname } = req.user
    const token = genJwtToken(_id, email)
    res.cookie('access-token', token, { httpOnly: true, sameSite: true })
    res.status(200).json({ isAuthenticated: true, user: { _id, email, firstname, lastname }  })
    } else {
      res.status(422).json({ isAuthenticated: false, error: errorMessage  })
    }
  } catch (err) {
    errorMessage = err.message
    error.status = 400
    return res.json(errorMessage)
  }
}

exports.logout = (req, res) => {
  console.log('HELLO')
  res.clearCookie('access-token');
  res.json({  isAuthenticated: false, user: { _id: '', email: '', firstname: '', lastname: '' }, success: true })
}

//https://www.youtube.com/watch?v=uw1c4Cfl9iU&list=PLvTjg4siRgU0HS3cANo7KZ52Wkud083TL&index=4&ab_channel=NoobCoder