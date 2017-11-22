const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session')

let response = {
    status: 200,
    data: [],
    message: null
}

const con = mysql.createConnection({
    host: "192.168.0.117",
    user: "admin",
    password: "admin",
    database: 'triplannerdb'
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


router.get('/getuserdetail', function (req, res) {
    var sql = 'SELECT * FROM account WHERE user_id = ' + mysql.escape(req.query.userid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
});

router.get('/getuserid', function (req, res) {
    var sql = 'SELECT * FROM account WHERE username = ' + mysql.escape(req.query.username);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
});

router.get('/users', function (req, res) {
    var user_id = req.session.user;
    var sql = 'SELECT * FROM account WHERE user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
});

router.get('/session', function (req, res) {
    response.data = req.session.user;
    res.json(response);
});

router.get('/login', function (req, res) {
    var temp = [];
    var sql = 'SELECT * FROM account WHERE username = ' + mysql.escape(req.query.user);
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result[0] != null) {
            if (result[0].password == req.query.pass) {
                req.session.user = result[0].user_id;
                response.data = req.session.user;
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
    var temp = [];
    var sql = 'INSERT INTO account (username,password,email) VALUES (' + mysql.escape(req.query.user) + ',' + mysql.escape(req.query.pass) + ',' + mysql.escape(req.query.email) + ')';
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });

});
router.get('/deleteplan', function (req, res) {
    sql = 'DELETE FROM plan WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    sql = 'DELETE FROM coplan WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'DONE';
        res.json(response);
    });
})

router.get('/createplan', function (req, res) {
    var temp = [];
    var user_id = req.session.user;
    var sql = 'INSERT INTO plan (plan_name,startdate,enddate,user_id) VALUES (' + mysql.escape(req.query.planname) + ',' + mysql.escape(req.query.startdate) + ',' + mysql.escape(req.query.enddate) + ',' + mysql.escape(user_id) + ')';
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    sql = 'SELECT * FROM plan WHERE plan_id=(SELECT MAX(plan_id) FROM plan)';
    con.query(sql, function (err, result) {
        response.data = result[0].plan_id;
        res.json(response);
    });
})

router.get('/putplandetail', function (req, res) {
    var temp = [];
    var sql = 'INSERT INTO plandetail (plan_id,starttime,date,type,detail,activityname) VALUES (' + mysql.escape(req.query.planid) + ',' + mysql.escape(req.query.starttime) + ',' + mysql.escape(req.query.date) + ',' + mysql.escape(req.query.type) + ',' + mysql.escape(req.query.detail) + ',' + mysql.escape(req.query.activityname) + ')';
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });

});

router.get('/logout', function (req, res) {
    req.session.user = null
    response.data = 'done';
    res.json(response);
});

router.get('/show', function (req, res) {
    res.end("Hi ,show api");
});

router.get('/getuserplan', function (req, res) {
    var user_id = req.session.user;
    sql = 'SELECT * FROM plan WHERE user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
});

router.get('/getplan', function (req, res) {
    sql = 'SELECT * FROM plan WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
});


router.get('/getplandetail', function (req, res) {
    sql = 'SELECT * FROM plandetail WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
});


router.get('/deleteplandetail', function (req, res) {
    sql = 'DELETE FROM plandetail WHERE acti_id = ' + mysql.escape(req.query.actid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'DONE';
        res.json(response);
    });
})

router.get('/getcoplan', function (req, res) {
    var user_id = req.session.user;
    sql = 'SELECT * FROM coplan WHERE user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
})

router.get('/setcoplan', function (req, res) {
    check = false;
    sql = 'SELECT * FROM coplan WHERE user_id = ' + mysql.escape(req.query.userid) + 'AND plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result1) {
        if (err) throw err;
        if (result1[0] == null)
            check = true;


        if (check == true) {
            sql = 'INSERT INTO coplan (plan_id,user_id) VALUES (' + mysql.escape(req.query.planid) + ',' + mysql.escape(req.query.userid) + ')';
            con.query(sql, function (err, result) {
                if (err) throw err;
                response.data = 'done';
                res.json(response);
            });
        }
        else {
            response.data = 'have already';
            res.json(response);
        }
    });
})

router.get('/editplan', function (req, res) {
    sql = 'UPDATE plan SET plan_name = ' + mysql.escape(req.query.planname) + ',startdate = ' + mysql.escape(req.query.startdate) + ',enddate = ' + mysql.escape(req.query.enddate) + ' WHERE plan_id = ' + mysql.escape(req.query.plan_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'DONE';
        res.json(response);
    });
})

router.get('/editplandetail', function (req, res) {
    sql = 'UPDATE plandetail SET starttime = ' + mysql.escape(req.query.starttime) + ',date = ' + mysql.escape(req.query.date) + ',type = ' + mysql.escape(req.query.type) + ',detail = ' + mysql.escape(req.query.detail) + ',activityname = ' + mysql.escape(req.query.activityname) + ' WHERE acti_id = ' + mysql.escape(req.query.actid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'DONE';
        res.json(response);
    });
})

router.get('/getreviewplan', function (req, res) {
    sql = 'SELECT * FROM plan WHERE plan_status = ' + mysql.escape('done');
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
})

router.get('/getnotreviewplan', function (req, res) {
    var user_id = req.session.user;
    sql = 'SELECT * FROM plan WHERE plan_status = ' + mysql.escape('waiting') + 'AND user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
})
router.get('/setreviewplan', function (req, res) {
    sql = 'UPDATE plan SET plan_status = ' + mysql.escape('done') + ',review_point = ' + mysql.escape(req.query.reviewpoint) + ' WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });
})

router.get('/getfavoritedetail', function (req, res) {
    var user_id = req.session.user;
    sql = 'SELECT * FROM favorite WHERE plan_id = ' + mysql.escape(req.query.planid) + 'AND user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
})

router.get('/getfavorite', function (req, res) {
    sql = 'SELECT * FROM favorite WHERE plan_id = ' + mysql.escape(req.query.planid) + 'AND status = "true"';
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    });
})

router.get('/favorite', function (req, res) {
    var user_id = req.session.user;
    var sql = 'INSERT INTO favorite (plan_id,user_id,status,time) VALUES (' + mysql.escape(req.query.planid) + ',' + mysql.escape(user_id) + ',' + mysql.escape("true") + ',' + mysql.escape(req.query.time) + ')';
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    sql = 'UPDATE plan SET favorite = favorite + 1 WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });
})

router.get('/delfavorite', function (req, res) {
    var user_id = req.session.user;
    sql = 'UPDATE favorite SET status = ' + mysql.escape("false") + ' WHERE plan_id = ' + mysql.escape(req.query.planid) + 'AND user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    sql = 'UPDATE plan SET favorite = favorite - 1 WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });
})

router.get('/addfavorite', function (req, res) {
    var user_id = req.session.user;
    sql = 'UPDATE favorite SET status = ' + mysql.escape("true") + ',time = ' + mysql.escape(req.query.time) + ' WHERE plan_id = ' + mysql.escape(req.query.planid) + 'AND user_id = ' + mysql.escape(user_id);
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    sql = 'UPDATE plan SET favorite = favorite + 1 WHERE plan_id = ' + mysql.escape(req.query.planid);
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = 'done';
        res.json(response);
    });
})

router.get('/getactivity', function (req, res) {
    sql = 'SELECT * FROM activity';
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.data = result;
        res.json(response);
    })
})
module.exports = router;