var express = require('express'),
    authRouter = express.Router(),
    mysql = require('./../database.js'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    transporter = require('../settings/mail'),
    app = express();
authRouter.use(bodyParser.json());

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
    res.render('login/login.pug', {
        message: flash_message
    });

});
authRouter.get('/forgot', function(req, res) {
    res.render('login/login-forgot.pug', {
        show: false
    })
})
/**
 *@param {results} MySQL query result, if user exist, we send email to him with password
 * else we 'Please check your user name'
 *@param {show} defines one of two states of recovery block.
 *{view} login-forgot.pug
 */
authRouter.post('/forgot', function(req, res) {
    var query = "select*from users where name='" + req.body.recoveryName + "'";
    mysql(query, function(err, results) {
        /*if name-> req.body.recoveryName exist in database*/
        if (results[0] != undefined) {

            var mailOptions = {
                from: '"Our Code World " <sergiybiluk@gmail.com>',
                to: results[0].email,
                subject: 'Hello',
                text: results[0].password,
                html: 'Hello, your password is: ' + results[0].password
            };
            /*sending email to user with his password*/
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
            });

            res.render('login/login-forgot.pug', {
                show: true
            })
            /*if name does not exist in database*/
        } else if (results[0] == undefined) {
            res.render('login/login-forgot.pug', {
                show: false,
                user: 'Please check your user name'
            })
        }
    })
})
authRouter.get('/signUp', function(req, res) {
    res.render('login/sign-up.pug')
})
authRouter.post('/signUp', urlencodedParser, function(req, res) {
    var values = {
        name: req.body.username,
        surname: req.body.surname,
        country: req.body.country,
        email: req.body.email,
        password: req.body.password
    }

    mysql("insert into users set ?", values, function(err, results) {

    })
    var mailOptions = {
        from: '"Our Code World " <sergiybiluk@gmail.com>',
        to: req.body.email,
        subject: 'Hello',
        text: 'unknown',
        html:
        `<h1>Hello, ${req.body.username}.</h1>
        <p>Thank you for your registration.</p>
        <p>Your password is ${req.body.password}</p>
        <p>Please don't answer on this email</p>`
    };
    /*sending email to user with his password*/
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
    });

    res.render('login/login.pug',{name:req.body.username,password:req.body.password})
});

authRouter.post('/emailCheck', urlencodedParser, function(req, res) {
  console.log('init')
    var query = "select*from users where email='" + req.body.userEmail + "'";
    mysql(query, function(err, results) {
        var state;
        results.length > 0 ?
            state = true :
            state = false
        res.end(JSON.stringify(results));
    })
});
authRouter.post('/nameCheck', urlencodedParser, function(req, res) {
    var query = "select*from users where name='" + req.body.userName + "'";
    mysql(query, function(err, results) {
        var state;
        results.length > 0 ?
            state = true :
            state = false
        res.end(JSON.stringify(results));
    })
});

module.exports = authRouter;
