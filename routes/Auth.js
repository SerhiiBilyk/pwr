var express = require('express');
var authRouter = express.Router();
var mysql = require('./../database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var app = express();

authRouter.get('/', function(req, res) {

    res.render('empty.pug' /*,{user:req.user}*/ );
});



authRouter.get('/login', function(req, res) {

    res.redirect('/auth');
});




module.exports = authRouter;
