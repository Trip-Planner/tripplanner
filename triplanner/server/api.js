const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const storage = require('dom-storage')
const session = require('express-session')

localStorage = new storage('./db.json', { strict: false, ws: '  ' })

let response = {
    status: 200,
    data: [],
    message: null
};
 
const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database : 'triplannerdb'
  });


con.connect(function(err){
    if(err)throw err;
    console.log("Connected!");
});


router.get('/users',function(req,res){
    con.query("SELECT * FROM account", function (err, result) {
        if (err) throw err;
        response.data = session;
        res.json(response);
      });
})

router.get('/session',function(req,res){
    localStorage.setItem('myKey', req.query.catid);
    response.data = req.query.name
        res.json(response);
})

router.get('/login', function (req, res) {
    response.data = localStorage.getItem('myKey');
    res.json(response);
    })


router.get('/show',function (req,res){
    res.end("Hi ,show api");
})

module.exports = router;