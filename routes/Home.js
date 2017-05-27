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
    res.render('login-forgot.pug',{show:false})
})
homeRouter.post('/forgot', function(req, res) {

  console.log('test: '+req.body.recoveryName)
  var query = "select email from users where name='" + req.body.recoveryName+"'" ;
  console.log(query)
  mysql(query, function(err, results) {
    var mailOptions = {
        from: '"Our Code World " <sergiybiluk@gmail.com>', // sender address (who sends)
        to: 'sergiybiluk@gmail.com', // list of receivers (who receives)
        subject: 'Hello', // Subject line
        text: 'Hello world ', // plaintext body
        html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }

    });
  console.log(results[0].email)
    res.render('login-forgot.pug',{show:true})
  })
})


module.exports = homeRouter;
