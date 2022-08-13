let errorMessage = {
  status: 422,
  message: 'Invalid user credentials'
}

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.status(422).json(errorMessage)
}


module.exports = {
  errorMessage,
  checkAuthenticated
};