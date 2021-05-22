require("dotenv").config() //Load Up .env Variables for Secrets
const ldap = require('ldapjs'); 
const jwt = require("jsonwebtoken")
var express = require('express');
const { decode } = require("punycode");
var router = express.Router();
var mysql = require("mysql");

/* Connect To MySQL */
var db = mysql.createPool({
    connectionLimit: 15,
    host:process.env.SQLADDR,
    user:process.env.SQLUSER,
    password:process.env.SQLPASS,
    database:"Inventory",
    multipleStatements: true
  });


/* Enable CORS and Require application/json Data Type */
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
/* Options and Token Secrets */
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

// let refreshTokens = [];
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
console.log("Connected to LDAP")


const authenticateUser = (req, res,next) =>{
    client.bind(`uid=${req.body.username},`+ process.env.FILTER, req.body.password, function (err) {
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
    client.search(process.env.FILTER, opts, function(err, res) { // cieusers: 1000003, cieadmin: 1000005
        res.on('searchEntry', function(entry) {
            const userData = {
                username : entry.object.uid,
                displayName : entry.object.displayName,
                email : entry.object.mail,
                uid: entry.object.uidNumber
            };
            if (entry.object.gidNumber == 1000005){
                userData["role"] = "admin"
            }
            else if (entry.object.gidNumber == 1000003){
                userData["role"] = "student"
            }
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

function checkExist(){

}

router.delete('/logout',(req,res)=>{ //Deauthenticate Token
    //refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    tokens = tokens.filter(token => token !== req.body.token);
    res.sendStatus(204)
})


router.post('/login',authenticateUser,(req,res)=>{
    findUser(req.body.username,function(userData){
        const accessToken = generateAccessToken(userData);
        // const refreshToken = jwt.sign(userData,tokenAcc,signRefresh);
        tokens.push(accessToken)
        // refreshTokens.push(refreshToken);
        res.json({accessToken});

        db.getConnection((err, connection)=>{
            var name = userData.displayName.split(' ')
            if(err){
                console.log("Error Connecting to DB");
                return 
            }
            connection.query(`INSERT IGNORE INTO Users(userID,firstname,lastname,role)
                VALUES 
                (?,?,?,?);`,[userData.uid,name[0],name[1],userData.role],(err)=>{
                    if(err){
                        console.log(err)
                        return 
                    }
                }) //Check if this query works
            connection.query("INSERT INTO loginStat(time,userID) VALUES (UNIX_TIMESTAMP(),?);",[
                userData.uid
            ],(err)=>{
                if(err) {
                    console.log(err)
                    return 
                };
                connection.release(err => { if (err) console.error(err) });
            })
        })
    })
})


// router.post('/token',(req,res)=>{ //Refresh Token For User
//     const refreshToken = req.body.token
//     if (refreshToken==null) return res.sendStatus(401);
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//     jwt.verify(refreshToken,publicKey,signRefresh,(err,user)=>{
//         if(err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({name: user.name})
//         res.json({accessToken})
//     })
// })


router.post('/user/info',authenticateToken,(req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    var decoded = jwt.decode(token);
    var userInfo = {
        username: decoded.username,
        displayName: decoded.displayName,
        email: decoded.email,
        role: decoded.role,
        uid: decoded.uid
    }
    // console.log("Type of Decoded JWT:",typeof decoded.username)
    return res.json({userInfo})
  });

module.exports = router;