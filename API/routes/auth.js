
const express = require('express');
const app = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

var config = require('../config');
var router = express.Router()


router.use(cookieParser());
router.use(bodyParser.json());
router.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

//App Secret Key
const secretKey = config.SECRET;

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET' 
// }));

// const port = config.PORT;
// app.listen(port , () => console.log('App listening on port ' + port));


/*  PASSPORT SETUP  */
const passport = require('passport');
var userProfile;
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = config.CLIENTID;
const GOOGLE_CLIENT_SECRET = config.GOOGLESECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://api.iot2.mcmullin.org/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
const authenticateJWT = (req, res, next) => {
  const authHeader = req.cookies;
  if (authHeader['token']) {

      jwt.verify(authHeader["token"], secretKey, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};


//Path for Authentication   
router.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/auth/success');
  });

// Send Cookie to Front end
router.get('/success', (req, res) => {
  const tokens = jwt.sign({user:userProfile["_json"]},secretKey);
  var date = new Date()
  date.setDate(date.getDate() + 2);
  res.cookie('token', tokens, {
    expires: date,
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  res.redirect('/');
});

// Retrieve User Information From Cookie
router.get("/user/info",authenticateJWT,(req,res)=>{
  var cookie = req.cookies;
  var decoded = jwt.decode(cookie["token"]);
  return res.json(decoded)
});

router.get('/error', (req, res) => res.send("error logging in"));

module.exports = router;