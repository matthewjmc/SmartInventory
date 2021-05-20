require("dotenv").config()

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fs = require('fs')
var express = require("express");
var mysql = require("mysql");
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
    if (err) throw err;
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
      connection.query("SELECT Items.itemID,Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID;",
      (err,rows)=>{
        if(err) throw err;
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
      connection.query(`SELECT Items.itemID,Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Users.userID= ?`,[
        val,
      ],
        (err,rows)=>{
        if(err) throw err;
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
        connection.query(`SELECT Items.itemID,Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Items.itemID= ?`,[
          val
        ],
        (err,rows)=>{
        if(err) throw err;
        connection.release(err => { if (err) console.error(err) });
        return res.json(rows)
    })
      })
    }
});

module.exports = router;
  
  