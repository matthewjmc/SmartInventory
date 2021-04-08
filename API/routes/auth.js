require("dotenv").config() //Load Up .env Variables for Secrets
const ldap = require('ldapjs'); 
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router()

router.use(express.json())

var options = {
    'rejectUnauthorized': false, //Allow Self-Signed Certificate for LDAPS
};
var client = ldap.createClient({ //Create Client to use for Server Authentication
    url: 'ldaps://ipa.cielab.net:8443',
    tlsOptions: options
});

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
// Username test, pass= test12345
function authenticateToken(req,res,next){ // API Side Middleware
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30m'});
}

router.delete('/logout',(req,res)=>{ //Deauthenticate Token
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204)
})

router.post('/login',authenticateUser,(req,res)=>{
    console.log("test")
    const username = req.body.username;
    const user = {name:username};
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({accessToken:accessToken,refreshToken:refreshToken});

})

let refreshTokens = [];
router.post('/token',(req,res)=>{ //Refresh Token For User
    const refreshToken = req.body.token
    if (refreshToken==null) return res.sendStatus(401);
    
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

router.get("/test",(req,res)=>{
    res.json({State:"test"})
})
module.exports = router;