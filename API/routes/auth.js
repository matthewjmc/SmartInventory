require("dotenv").config() //Load Up .env Variables for Secrets
const ldap = require('ldapjs'); 
const jwt = require("jsonwebtoken")
const fs = require("fs")
var express = require('express');
var router = express.Router()

router.use(express.json())

var privateKey = fs.readFileSync('key.pem','utf-8');
var publicKey = fs.readFileSync('public.pem','utf-8');

/* Signing Options */
var issuer = process.env.ISSUER;
var subject = process.env.SUBJECT;
var audience = process.env.AUDIENCE;
var algorithm = 'ES256';
var expiresIn = '30m'

var signOptions = {
    issuer,
    subject,
    audience,
    algorithm,
    expiresIn
}
var signRefresh = {
    issuer,
    subject,
    audience,
    algorithm
}

let refreshTokens = [];

var options = {
    'rejectUnauthorized': false, //Allow Self-Signed Certificate for LDAPS
};
var client = ldap.createClient({ //Create Client to use for Server Authentication
    url: process.env.LDAPURL,
    reconnect: true,
    tlsOptions: options
});
client.on('error', (err) => {
    console.log("LDAP Error:",err)
  })

const authenticateUser = (req, res,next) =>{
    client.bind(`uid=${req.body.username},cn=users,cn=accounts,dc=cielab,dc=net`, req.body.password, function (err) {
        if (err) {
            console.log("Error in new connetion " + err)
            res.sendStatus(403)
        } else {
            console.log("User Authenticated")
            next()
        }
    });
}

const findUser = async (username,callback)=>{ // Get User info from LDAP Database
    let opts = {
        filter: `uid=${username}`,
        scope: 'sub'
    };
    console.log("Finding User Info in LDAP DB")
    client.search('cn=users,cn=accounts,dc=cielab,dc=net', opts, function(err, res) {
        res.on('searchEntry', function(entry) {
            const userData = {
                username : entry.object.uid,
                displayName : entry.object.displayName,
                email : entry.object.mail
            };
            callback(userData);
        });
    });
}

function authenticateToken(req,res,next){ // API Side Middleware
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)
    jwt.verify(token,publicKey,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user){
    return jwt.sign(user,privateKey,signOptions);
}

router.delete('/logout',(req,res)=>{ //Deauthenticate Token
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204)
})

router.post('/login',authenticateUser,(req,res)=>{
    findUser(req.body.username,function(userData){
        const accessToken = generateAccessToken(userData);
        const refreshToken = jwt.sign(userData,privateKey,signRefresh);
        refreshTokens.push(refreshToken);
        res.json({accessToken,refreshToken});
    })
})


router.post('/token',(req,res)=>{ //Refresh Token For User
    const refreshToken = req.body.token
    if (refreshToken==null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,publicKey,signRefresh,(err,user)=>{
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken})
    })
})

router.post('/user/info',authenticateToken,(req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    var decoded = jwt.decode(token);
    return res.json(decoded)
  });

module.exports = router;