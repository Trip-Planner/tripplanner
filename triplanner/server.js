const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http =require('http');
const app = express();
const api = require('./server/api');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname,'dist')));

app.use('/api',api);

app.get('*',function (req,res){
    res.sendFile(path.join(__dirname, 'src/index.html'));
})

const server = app.listen(8081,function (){
    const port = server.address().port;
    console.log("Server is running.. at port : %s",port);
})