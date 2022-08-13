const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { validatePassword } = require('../utils/genhash.utils');
const { errorMessage } = require('../utils/common.utils')

const Users = mongoose.model('Users');


const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"]
  }
  return token
}

//USED FOR AUTHORIZATION
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.TOKEN_KEY,
}, (payload, done) => {
  Users.findById({ _id: payload.sub}, (err, user) => {
    if (err)  return done(null, false)
    if (user) return done(null, user)
    else return done(null, false)
  })
}))


//USED FOR AUTHENTICATION USING LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField:'username',
  passwordField: 'password',
}, (username, password, done) => {
  const email = username.toLowerCase()
  Users.findOne({ email }, async (err, user) => {
    if (err) return done(err)
    const validatedPassword = await validatePassword(password, user.password)
    if(!user) {
      errorMessage.message = 'User does not exist';
      return done(null, false, errorMessage);
    }

    if(!validatedPassword) {
      return done(null, false, errorMessage);
    }

    return done(null, user);
  })
}));


// A data scientist may design the way data is stored, manipulated and analyzed. Simply put, a data analyst makes sense out of existing data, whereas a data scientist works on new ways of capturing and analyzing data to be used by the analysts.

// I developed the REST API of an Election Campaign App using Ionic as the front-end client, NestJS at the back-end and MongoDB as the database and TypeORM as the middleware.
// DEAR Human Resource Manager
// I am writing to apply for the position of Backend Developer. I have more than two years of experience in developing applications and my professional expertise aligns closely with the responsibilities outlined in your job advertisement.

// Your job advert outlined the need for someone who is experienced in NodeJS, Postgres and AWS, all of which are areas I have experience in. I am currently employed at M-R International. Where I’ve honed my skills by designing and developing Stable and Maintainable websites/applications in fast-paced, collaborative environments. I'm Proficient at Creating compelling user interfaces and a Team Player.

// I am confident that my passion for excellence, unparalleled attention to detail, ability to work under pressure, adapt and learn any tool in good time will make me an asset and allow me to contribute to the team’s success.
// While thanking you, I anticipate discussing the Software Developer position and my qualification with you in more detail.

// Sincerely,

// Godstrump George
