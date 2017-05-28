var express = require('express');
var homeRouter = express.Router();
var mysql = require('./../database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    transporter = require('../settings/mail');
homeRouter.use(bodyParser.json());



/**
 *@param {user} if user exist, his name will apear on nav background-color
 * else , name of {user} will be 'guest'
 */
homeRouter.get('/', function(req, res) {
    console.log('flash ' + req.session.flash);
    var user; /*=req.user.name ||'guest';*/
    if (req.hasOwnProperty('user')) {
        user = req.user.name;
    } else {
        user = "guest"
    }
    mysql('select*from users', function(err, data) {
        res.render('home.pug', {
            user: user
        })
    });
})


homeRouter.get('/contact', function(req, res) {
    res.send('Home contact')
})
homeRouter.get('/delete/:id', function(req, res) {
    mysql(`delete from users where id=${req.params.id}`, function(err, data) {
        res.redirect('/home')
    })
})
homeRouter.post('/create', urlencodedParser, function(req, res) {

    var values = {
        name: req.body.name,
        surname: req.body.surname
    }
    mysql("insert into users set ?", values, function(err, results) {

    })

    res.redirect('/home')
});
/**
 *@param {req.body.name} book title, SearchController
 */
homeRouter.post('/loadData', urlencodedParser, function(req, res) {
    console.dir(req.body.name);
    var query = "select*from Books where title like '%" + req.body.name + "%' order by rating desc  ";
    console.log(query)
    mysql(query, function(err, results) {
        console.log(results.length);
        res.end(JSON.stringify(results));
    })


});
homeRouter.get('/forgot', function(req, res) {
    res.render('login-forgot.pug', {
        show: false
    })
})
/**
*@param {results} MySQL query result, if user exist, we send email to him with password
* else we 'Please check your user name'
*{view} login-forgot.pug
*/
homeRouter.post('/forgot', function(req, res) {
    var query = "select*from users where name='" + req.body.recoveryName + "'";
    mysql(query, function(err, results) {

        if (results[0] != undefined) {
            console.log(results[0])
            var mailOptions = {
                from: '"Our Code World " <sergiybiluk@gmail.com>',
                to: results[0].email,
                subject: 'Hello',
                text: results[0].password,
                html: 'Hello, your password is: ' + results[0].password
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
            });

            res.render('login-forgot.pug', {
                show: true
            })
        } else if (results[0] == undefined) {

            res.render('login-forgot.pug', {
                show: false,
                user: 'Please check your user name'
            })
        }

    })
})



module.exports = homeRouter;
