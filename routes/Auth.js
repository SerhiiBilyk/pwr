var express = require('express');
var authRouter = express.Router();
var mysql = require('./../database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var session = require('express-session')//('client-sessions');





var app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
    extended: true
}));






authRouter.get('/', function(req, res) {

    res.render('empty.pug' /*,{user:req.user}*/ );
});



authRouter.get('/login', function(req, res) {

    res.redirect('/auth');
});




module.exports = authRouter;
