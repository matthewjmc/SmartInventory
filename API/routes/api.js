const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
var config = require('../config');

var express = require("express");
var mysql = require("mysql");
var router = express.Router()

router.use(cookieParser());
router.use(bodyParser.json());
router.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));


//DB Connection
var con = mysql.createConnection({
    host:config.SQLADDR,
    user:config.SQLUSER,
    password:config.SQLPASS,
    database:"Inventory"
  });
  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
  });


const secretKey = config.SECRET;


const authenticateJWT = (req, res, next) => {
    var header = req.header("Accept")
    const authHeader = req.cookies;
    if (authHeader['token'] && header == "application/json") {
  
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

//Retrieve All Items in Inventory 
router.get("/inventory",authenticateJWT,(req,res)=>{
    var header = req.header("Accept");
    con.query("SELECT Items.item_name, Items.description, Stock.availability, Stock.amount FROM Stock INNER JOIN Items ON Stock.itemID=Items.itemID;",(err,rows)=>{
    if (err) throw err;
    return res.json(rows)
    });
      
  });
  
router.get("/withdraw",authenticateJWT,(req,res)=>{
    var Data = req.query.command;
    var val = req.query.value;
    if (Data == "all"){
    con.query("SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID;",
    (err,rows)=>{
        if(err) throw err;
        return res.json(rows)
    })
    } else if (Data == "userID"){
    con.query(`SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Users.userID=${val};`,
    (err,rows)=>{
        if(err) throw err;
        return res.json(rows)
    })
    } else if(Data == "itemID"){
    con.query(`SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Items.itemID= ${val};`,
    (err,rows)=>{
        if(err) throw err;
        return res.json(rows)
    })
    }
});

module.exports = router;
  
  