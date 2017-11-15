const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const storage = require('dom-storage')
const session = require('express-session')

localStorage = new storage('./db.json', { strict: false, ws: '  ' });
let response = {
    status: 200,
    data: [],
    message: null
}

const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",  
    database: 'triplannerdb'
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

router.get('/users', function (req, res) {
    con.query("SELECT * FROM account", function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
});

router.get('/session', function (req, res) {
    response.data = localStorage.getItem('CurrentUser');
    res.json(response);
});

router.get('/login', function (req, res) {
    var temp=[];
    
    var sql = 'SELECT * FROM account WHERE username = ' + mysql.escape(req.query.user);
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(result[0]!=null)
        {
        if (result[0].password == req.query.pass) {
            localStorage.setItem('CurrentUser',result[0].user_id);
            response.data = localStorage.getItem('CurrentUser');
        }
        else
            response.data = null;
        }
        else
        response.data = null;
        res.json(response);
    });
   
});

router.get('/register', function (req, res) {
    var temp=[];
    var sql = 'INSERT INTO account (username,password,email) VALUES (' + mysql.escape(req.query.user)+','+mysql.escape(req.query.pass)+','+mysql.escape(req.query.email)+')';
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });
   
});

router.get('/createplan', function (req, res) {
    var temp=[];
    var user_id = localStorage.getItem('CurrentUser');
    var sql = 'INSERT INTO plan (plan_name,startdate,enddate,user_id) VALUES (' + mysql.escape(req.query.planname)+','+mysql.escape(req.query.startdate)+','+mysql.escape(req.query.enddate)+','+mysql.escape(user_id)+')';
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    sql = 'SELECT * FROM plan WHERE plan_name = ' + mysql.escape(req.query.planname);
    con.query(sql, function (err, result) {
        if (err) throw err;
        result.forEach(function(element) {
            if(element.user_id == user_id)
            response.data = element.plan_id;
            return res.json(response);
        }, this);
    });
});

router.get('/putplandetail', function (req, res) {
    var temp=[];
    var sql = 'INSERT INTO plandetail (plan_id,starttime,date,type,detail,activityname) VALUES (' + mysql.escape(req.query.planid)+','+mysql.escape(req.query.starttime)+','+mysql.escape(req.query.date)+','+mysql.escape(req.query.type)+','+mysql.escape(req.query.detail)+','+mysql.escape(req.query.activityname)+')';
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });
   
});

router.get('/logout', function (req, res) {
    localStorage.clear();
    response.data = 'done';
    res.json(response);
});

router.get('/show', function (req, res) {
    res.end("Hi ,show api");
});

router.get('/getplan',function (req,res) {
    var user_id = localStorage.getItem('CurrentUser');
    sql = 'SELECT * FROM plan WHERE user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data= result;
        res.json(response);
    });
});


router.get('/getplandetail',function (req,res) {
    sql = 'SELECT * FROM plandetail WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data= result;
        res.json(response);
    });
});

router.get('/deleteplan',function (req,res){
    sql = 'DELETE FROM plan WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data= 'DONE';
        res.json(response);
    });
})
router.get('/deleteplandetail',function (req,res){
    sql = 'DELETE FROM plandetail WHERE acti_id = ' + mysql.escape(req.query.actid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data= 'DONE';
        res.json(response);
    });
})

router.get('/editplan',function (req,res){
    sql = 'UPDATE plan SET plan_name = '+mysql.escape(req.query.planname)+',startdate = '+mysql.escape(req.query.startdate)+',enddate = '+mysql.escape(req.query.enddate)+' WHERE plan_id = '+mysql.escape(req.query.plan_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data= 'DONE';
        res.json(response);
    });
})


router.get('/editplandetail',function (req,res){
    sql = 'UPDATE plandetail SET starttime = '+mysql.escape(req.query.starttime)+',date = '+mysql.escape(req.query.date)+',type = '+mysql.escape(req.query.type)+',detail = '+mysql.escape(req.query.detail)+',activityname = '+mysql.escape(req.query.activityname)+' WHERE act_id = '+mysql.escape(req.query.actid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data= 'DONE';
        res.json(response);
    });
})



module.exports = router;