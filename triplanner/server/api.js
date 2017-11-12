const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let response = {
    status: 200,
    data: [],
    message: null
};

const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database : 'testing'
  });


con.connect(function(err){
    if(err)throw err;
    console.log("Connected!");
});


router.get('/users',function(req,res){
    con.query("SELECT * FROM table1", function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
      });
})

router.get('/show',function (req,res){
    res.end("Hi ,show api");
})

module.exports = router;