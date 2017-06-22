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

        res.render('book.pug', {
            user: user,
            data: results[0]
        })
    })
});
bookRouter.post('/like/:id', function(req, res) {
  console.log('post request',req.params.id)
    mysql(`update book_coments set likes = likes + 1 where id=${req.params.id}`, function(err, results) {
      mysql(`select book_coments.id, book_coments.comment,book_coments.feedback, book_coments.likes,book_coments.dislikes,  date_format(book_coments.cur_date,'%d/%m/%Y') as cur_date, users.name from book_coments join users on book_coments.user_id=users.id and book_coments.book_id=${req.body.book_id};`, function(err, results) {
          res.end(JSON.stringify(results));
      })
    })
});
bookRouter.post('/dislike/:id', function(req, res) {
  console.log('post request',req.params.id)
    mysql(`update book_coments set dislikes = dislikes + 1 where id=${req.params.id}`, function(err, results) {
      mysql(`select book_coments.id, book_coments.comment,book_coments.feedback, book_coments.likes,book_coments.dislikes,  date_format(book_coments.cur_date,'%d/%m/%Y') as cur_date, users.name from book_coments join users on book_coments.user_id=users.id and book_coments.book_id=${req.body.book_id};`, function(err, results) {
          res.end(JSON.stringify(results));
      })
    })
});
bookRouter.post('/:id', urlencodedParser, function(req, res) {

    if (req.body.coment.length > 10) {
        console.log('length more than 10')
        var values = {

            book_id: req.params.id,
            user_id: req.session.passport.user,
            comment: req.body.coment,
            cur_date: new Date(),
            feedback: req.body.feedback
        }
        console.dir(values)
        mysql("insert into book_coments set ?", values, function(err, results) {
            console.log('inserted')
        })
    }
    mysql(`select book_coments.id, book_coments.comment,book_coments.feedback, book_coments.likes,book_coments.dislikes,  date_format(book_coments.cur_date,'%d/%m/%Y') as cur_date, users.name from book_coments join users on book_coments.user_id=users.id and book_coments.book_id=${req.params.id};`, function(err, results) {


        res.end(JSON.stringify(results));
    })
});
bookRouter.get('/add/:id', function(req, res) {
    req.user ?
        mysql(`select*from users where name='${req.user.name}'`, function(err, results) {
            var values = {
                book_id: req.params.id,
                user_id: results[0].id
            }
            mysql("insert into user_books set ?", values, function(err, results) {
                res.redirect('/home/user/' + req.user.name);
            })
        }) :
        res.redirect('/auth/login');
})

module.exports = bookRouter;
