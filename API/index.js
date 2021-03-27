
const express = require('express');
const app = express();

var config = require('./config');

//Preconfigured Routes
var api = require("./routes/api");
var auth = require("./routes/auth")

app.use("/api",api);
app.use("/auth",auth)

app.use(clientErrorHandler)

app.get('/', function(req, res) {
  res.json('This is an API Backend');
});

const port = config.PORT;
app.listen(port , () => console.log('App listening on port ' + port));


function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
