require("dotenv").config()

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fs = require('fs')
var express = require("express");
var mysql = require("mysql");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
var router = express.Router()

var tokenAcc = process.env.TOKENSECRET

router.use(cookieParser());
router.use(bodyParser.json());
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

//DB Connection
var db = mysql.createPool({
    connectionLimit: 15,
    host:process.env.SQLADDR,
    user:process.env.SQLUSER,
    password:process.env.SQLPASS,
    database:"Inventory"
  });

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

function authenticateToken(req,res,next){ // API Side Middleware
  //console.log("MiddleWare Request:",req.headers)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401)
  jwt.verify(token,tokenAcc,signOptions,(err,user)=>{
      if (err) return res.sendStatus(403)
      req.user = user
      next()
  })
}

//Retrieve All Items in Inventory 
router.get("/inventory",authenticateToken,(req,res)=>{
  db.getConnection((err, connection) =>{
    if(err) {
      console.log("Error Connecting to BD")
      return res.sendStatus(500)
    }
    connection.query("SELECT Items.item_name, Items.description, Stock.availability, Stock.amount FROM Stock INNER JOIN Items ON Stock.itemID=Items.itemID;",(err,rows)=>{
    if (err) {
      return res.sendStatus(500)
    };
    connection.release(err => { if (err) console.error(err) });
    return res.json(rows)
    });
  })
});
  
router.get("/withdraw",authenticateToken,(req,res)=>{
    var Data = req.query.command;
    var val = req.query.value;
    if (Data == "all"){
    db.getConnection((err,connection)=>{
      if (err) {
        console.log("Error Connecting to DB")
        return res.sendStatus(500)
      }
      connection.query("SELECT Items.itemID,Items.item_name,Users.userID,Users.firstname,Users.lastname,DATE_FORMAT(Borrow_Record.date_borrowed,'%D %M %Y %h:%i:%s') AS DateBorrowed ,DATE_FORMAT(Borrow_Record.expected_return_date,'%D %M %Y %h:%i:%s') AS ExpectedReturn FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID;",
      (err,rows)=>{
        if(err) {
          return res.sendStatus(500)
        };
        connection.release(err => { if (err) console.error(err) });
        return res.json(rows)
    });
    })
    } else if (Data == "userID"){
    db.getConnection((err,connection)=>{
      if(err) {
        console.log("Error Connecting to DB")
        return res.sendStatus(500)
      }
      connection.query(`SELECT Items.itemID,Items.item_name,Users.userID,Users.firstname,Users.lastname,DATE_FORMAT(Borrow_Record.date_borrowed,'%D %M %Y %h:%i:%s') AS DateBorrowed ,DATE_FORMAT(Borrow_Record.expected_return_date,'%D %M %Y %h:%i:%s') AS ExpectedReturn FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Users.userID= ?`,[
        val,
      ],
        (err,rows)=>{
        if(err) {
          return res.sendStatus(500)
        };
        connection.release(err => { if (err) console.error(err) });
        return res.json(rows)
    })
    })
    } else if(Data == "itemID"){
      db.getConnection((err,connection)=>{
        if(err){
          console.log("Error Connecting to DB")
          return res.sendStatus(500)
        }
        connection.query(`SELECT Items.itemID,Items.item_name,Users.userID,Users.firstname,Users.lastname,DATE_FORMAT(Borrow_Record.date_borrowed,'%D %M %Y %h:%i:%s') AS DateBorrowed ,DATE_FORMAT(Borrow_Record.expected_return_date,'%D %M %Y %h:%i:%s') AS ExpectedReturn FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Items.itemID= ?`,[
          val
        ],
        (err,rows)=>{
        if(err) {
          return res.sendStatus(500)
        };
        connection.release(err => { if (err) console.error(err) });
        return res.json(rows)
    })
      })
    }
});

router.get("/loginstat",authenticateToken,(req,res)=>{
  var userid = req.query.userid;
  if(userid == "all"){
    db.getConnection((err,connection)=>{
      if(err){
        console.log(err)
        return res.sendStatus(500)
      }
      connection.query(`SELECT 
            CONCAT_WS(" ",Users.firstname,Users.lastname) AS FullName, 
            loginStat.userID AS userID, 
            FROM_UNIXTIME(time,'%D %M %Y %h:%i:%s') AS TimeLogin 
            FROM loginStat
            INNER JOIN Users
            On loginStat.userID=Users.userID;`,
      (err,rows)=>{
        if(err){
          return res.sendStatus(500)
        }
        connection.release(err => { if (err) console.error(err) });
        return res.json(rows)
      }
      )
    })
  }
  else{
    db.getConnection((err,connection)=>{
      if(err){
        console.log("Error Connecting to DB");
        return res.sendStatus(500)
      }
      connection.query(`SELECT 
          CONCAT_WS(" ",Users.firstname,Users.lastname) AS FullName,
          loginStat.userID AS userID, 
          FROM_UNIXTIME(time,'%D %M %Y %h:%i:%s') AS TimeLogin 
          FROM loginStat
          INNER JOIN Users
          On loginStat.userID=Users.userID
          WHERE loginStat.userID=?;`,[userid],
      (err,rows)=>{
        if(err){
          console.log("Error Query from DB")
          return res.sendStatus(500)
        }
        connection.release(err => { if (err) console.error(err) });
        return res.json(rows)
      }
      )
    })
  }
});

function getElem(obj){
  var months = [];
  for(var items = 0; items < obj.length; items++){
    months.push(obj[items].Month);
  }
  return Array.from(new Set(months))
}

function getMaxDates(months,obj){
  temp = [];
  for(var i=0; i<months.length; i++){
    curMax = {};
    for(var j=0; j<obj.length; j++){
      if(Object.keys(curMax).length == 0 && obj[j].Month == months[i]){
        curMax = obj[j];
      }
      else if(obj[j].Month == months[i] && obj[j].AmountBorrowed>curMax.AmountBorrowed){
        curMax = obj[j]
      }
    }
    temp.push(curMax)
  }
  return temp
}

router.get('/borrowstats',authenticateToken,(req,res)=>{
  db.getConnection((err,connection)=>{
    if(err){console.log("Error Connecting to DB");return res.sendStatus(500)}
    connection.query(`
        SELECT 
        Items.item_name AS Name,
        COUNT(Items.itemID) AS AmountBorrowed

        FROM Borrow_Record
        INNER JOIN Items
        ON Borrow_Record.itemID=Items.itemID
        GROUP BY Items.itemID;`,
        (err,row)=>{
          if(err){return res.sendStatus(500)}
          connection.release(err => { if (err) console.error(err) });
          return res.json(row)
        })
  })
})

module.exports = router;
  
  