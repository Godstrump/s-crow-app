const bcrypt = require('bcryptjs');

const genPasswordHash = async (password, value) => {
  let hashedPass
  let salted
  await bcrypt.genSalt(value).then(salt => {
    salted = salt
  })

  await bcrypt.hash(password, salted).then(hash => {
    console.log('Password successfully hashed', hash)
    hashedPass = hash
  })
  return hashedPass
}

const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash).then(result => {
    console.log('SUCCESS', result)
    return result
  })
}

module.exports = {
  genPasswordHash,
  validatePassword
};