var express = require('express'),
    bookRouter = express.Router(),
    mysql = require('./../database.js'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    user;
bookRouter.use(bodyParser.json());

bookRouter.use('/*', function(req, res, next) {
    req.hasOwnProperty('user') ?
        user = req.user.name :
        user = "guest"
    next()
})

bookRouter.get('/:id', function(req, res) {
    mysql(`select*from books where id=${req.params.id}`, function(err, results) {
        console.dir(results[0])
        res.render('book.pug', {
            user: user,
            data: results[0]
        })
    })
});
bookRouter.get('/add/:id', function(req, res) {
  req.user?
    mysql(`select*from users where name='${req.user.name}'`, function(err, results) {
        var values = {
            book_id: req.params.id,
            user_id:results[0].id
        }
        mysql("insert into user_books set ?", values, function(err, results) {
          res.redirect('/home/user/'+req.user.name);
        })
    }):
    res.redirect('/auth/login');
})

module.exports = bookRouter;
