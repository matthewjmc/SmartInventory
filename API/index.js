const express = require('express');
const app = express();
require("dotenv").config()
const fs = require("fs")

// //HTTPS Configuration
// const https = require("https")
// var privKey = fs.readFileSync("./sslcert/cert.key","utf-8")
// var certificate = fs.readFileSync("./sslcert/cert.crt","utf-8")
// var credentials = {key: privKey, cert: certificate};


//Preconfigured Routes
var api = require("./routes/api");
var auth = require("./routes/auth")

app.use("/api",api);
app.use("/auth",auth)

app.use(clientErrorHandler)

app.get('/', function(req, res) {
  res.json({Invalid:"Request to API Backend"});
});

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

const port = process.env.PORT;
app.listen(port , () => console.log('App listening on port ' + port));
// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(8443)