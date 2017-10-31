const express = require('express');
const router = express.Router();

router.get('/show',function (req,res){
    res.end("Hi ,show api");
})

module.exports = router;