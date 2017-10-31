const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var user
const app = express();
app.use(express.static(path.join(__dirname,'dist')));

app.use('/api',function(req,res){
    req.param('user')
})

app.use('*',function (req,res){
    res.sendFile(path.join(__dirname, 'src/index.html'));
})
//testing
const server = app.listen(8081,function (){
    const port = server.address().port;
    console.log("Server is running.. at port : %s",port);
})