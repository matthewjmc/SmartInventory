// index.js

/*  EXPRESS */

const express = require('express');
const app = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.json('HelloWorld');
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

// index.js

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;


app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// index.js

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '719273688627-5qbmgglnl9fgome2n46gjrhb6nrb9g9u.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'bvd2rGD7a_rfRaWLHpAVPQyF';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://auth.iot2.mcmullin.org/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 

const secretKey = "aoisdjfoiajdsoifjasodif";

  /*  JSON Web Tokens  */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.cookies;
  //console.log(authHeader["token"])
  if (authHeader['token']) {

      jwt.verify(authHeader["token"], secretKey, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          //console.log(user)
          next();
      });
  } else {
      res.sendStatus(401);
  }
};


app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });


app.get('/success', (req, res) => {
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

app.get("/user/info",authenticateJWT,(req,res)=>{
  var cookie = req.cookies;
  var decoded = jwt.decode(cookie["token"]);
  return res.json(decoded)
});


app.get('/error', (req, res) => res.send("error logging in"));
