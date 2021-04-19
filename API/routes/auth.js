require("dotenv").config() //Load Up .env Variables for Secrets
const ldap = require('ldapjs'); 
const jwt = require("jsonwebtoken")
var express = require('express');
const { decode } = require("punycode");
var router = express.Router()

router.use(express.json())
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key,authorization');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
        }
})
var tokenAcc = process.env.TOKENSECRET

/* Signing Options */
var issuer = process.env.ISSUER;
var subject = process.env.SUBJECT;
var audience = process.env.AUDIENCE;
var expiresIn = '1d'

var signOptions = {
    issuer,
    subject,
    audience,
    expiresIn
}
var signRefresh = {
    issuer,
    subject,
    audience,
    
}

let refreshTokens = [];
let tokens = [];

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
            next()
        }
    });
}

const findUser = async (username,callback)=>{ // Get User info from LDAP Database
    let opts = {
        filter: `uid=${username}`,
        scope: 'sub'
    };
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
    jwt.verify(token,tokenAcc,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user){
    return jwt.sign(user,tokenAcc,signOptions);
}

router.delete('/logout',(req,res)=>{ //Deauthenticate Token
    //refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    tokens = tokens.filter(token => token !== req.body.token);
    res.sendStatus(204)
})

router.post('/login',authenticateUser,(req,res)=>{
    findUser(req.body.username,function(userData){
        const accessToken = generateAccessToken(userData);
        const refreshToken = jwt.sign(userData,tokenAcc,signRefresh);
        tokens.push(accessToken)
        refreshTokens.push(refreshToken);
        res.json({accessToken});
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
    var userInfo = {
        username: decoded.username,
        displayName: decoded.displayName,
        email: decoded.email
    }
    // console.log("Type of Decoded JWT:",typeof decoded.username)
    return res.json({userInfo})
  });

module.exports = router;