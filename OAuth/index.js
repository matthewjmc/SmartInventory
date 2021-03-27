
const express = require('express');
const app = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

var config = require('./config');

//Preconfigured Routes
var api = require("./routes/api");


//App Secret Key
const secretKey = 'aoisdjfoiajdsoifjasodif';

app.use("/api",api);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.json('Wrong Site');
});
const port = config.PORT;
app.listen(port , () => console.log('App listening on port ' + port));


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


/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = config.CLIENTID;
const GOOGLE_CLIENT_SECRET = config.GOOGLESECRET;
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
 
const authenticateJWT = (req, res, next) => {
  const authHeader = req.cookies;
  //console.log(authHeader["token"])
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
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

// Send Cookie to Front end
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

// Retrieve User Information From Cookie
app.get("/user/info",authenticateJWT,(req,res)=>{
  var cookie = req.cookies;
  var decoded = jwt.decode(cookie["token"]);
  return res.json(decoded)
});

app.get('/error', (req, res) => res.send("error logging in"));
