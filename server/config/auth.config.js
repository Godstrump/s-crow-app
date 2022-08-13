// const passport=require('passport');
// const User = require('../model/users.model')

// module.exports = function(passport) {

//   console.log('AUTH CONFIG')

//   passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//       cb(null, { id: user.id, username: user.username });
//     });
//   });
  
//   passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });

//     //load strategy files
//     require('./passport.config');
// }