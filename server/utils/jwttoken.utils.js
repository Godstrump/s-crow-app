const jwt = require('jsonwebtoken');

const genJwtToken = (userId, email) => {
  return jwt.sign(
    { user_id: userId, email },
    process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
  )
}

module.exports = {
  genJwtToken,
}