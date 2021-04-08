require("dotenv").config()
// const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

var express = require("express");
var mysql = require("mysql");
var router = express.Router()

router.use(cookieParser());
router.use(bodyParser.json());
// router.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'SECRET' 
//   }));


//DB Connection
var db = mysql.createPool({
    connectionLimit: 15,
    host:process.env.SQLADDR,
    user:process.env.SQLUSER,
    password:process.env.SQLPASS,
    database:"Inventory"
  });



function authenticateToken(req,res,next){ // API Side Middleware
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
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
    var header = req.header("Accept");
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
      connection.query("SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID;",
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
      connection.query(`SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Users.userID=${val};`,
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
        connection.query(`SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Items.itemID= ${val};`,
        (err,rows)=>{
        if(err) throw err;
        connection.release(err => { if (err) console.error(err) });
        return res.json(rows)
    })
      })
    }
});

module.exports = router;
  
  