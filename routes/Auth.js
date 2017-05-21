var express = require('express');
var authRouter = express.Router();
var mysql = require('./../database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var app = express();

authRouter.get('/', function(req, res) {
    res.render('empty.pug');
});

authRouter.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/home');
});

authRouter.get('/login', function(req, res) {
    /**
     * @param {array} req.session.flash
     *when we create new message, this message is pushed to existing array,
     *so, we need always to store  only one value
     *
     */
    var flash_message;
    req.session.flash ?
        flash_message = req.session.flash.error.pop() : false;
    res.render('login.pug', {
        message: flash_message
    });

});




module.exports = authRouter;
