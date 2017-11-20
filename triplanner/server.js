const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const api = require('./server/api');
const session = require('express-session')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "ui2hf89hg32ofn3023fp", resave: false, saveUninitialized: true }))
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', function (req, res) {
    var sess = req.session;
    res.sendFile(path.join(__dirname, 'src/index.html'));
})

const server = app.listen(8081, function () {
    const port = server.address().port;
    console.log("Server is running.. at port : %s", port);
})