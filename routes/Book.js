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

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/home');
}

bookRouter.get('/:id', function(req, res) {

    mysql(`select*from books where id=${req.params.id}`, function(err, results) {

        res.render('book.pug', {
            user: user,
            data: results[0]
        })
    })
});
bookRouter.get('/like/showLikes/:id', function(req, res) {

    mysql(` select user_id, users.name from book_coments_like join users on book_coments_like.user_id=users.id where coment_id=${req.params.id} and likes<>0;`, function(err, results) {
        res.send({
            data: results
        })
    })


})

bookRouter.post('/like/:id', isLoggedIn, function(req, res) {
    mysql(`select * from  book_coments_like where (coment_id,user_id,likes) in ((${req.body.coment_id},${req.session.passport.user},1))`, function(err, results) {

        if (results.length < 1) {

            var values = {
                coment_id: req.body.coment_id,
                user_id: req.session.passport.user,
                likes: 1
            }

            mysql(`insert into book_coments_like set ?`, values, function(err, results) {})
        }
        mysql(`select book_coments.id,book_coments.feedback, book_coments.user_id,book_coments.book_id, book_coments.comment, second.coment_id,suma,suma2 from book_coments left  join  (select coment_id, sum(likes) as suma, sum(dislikes) as suma2 from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.body.book_id};`, function(err, results) {

            res.send(results);
        })

    })


});
bookRouter.post('/dislike/:id', function(req, res) {
  mysql(`select * from  book_coments_like where (coment_id,user_id,dislikes) in ((${req.body.coment_id},${req.session.passport.user},1))`, function(err, results) {

      if (results.length < 1) {

          var values = {
              coment_id: req.body.coment_id,
              user_id: req.session.passport.user,
              dislikes: 1
          }

          mysql(`insert into book_coments_like set ?`, values, function(err, results) {})
      }
      mysql(`select book_coments.id,book_coments.feedback, book_coments.user_id,book_coments.book_id, book_coments.comment, second.coment_id,suma,suma2 from book_coments left  join  (select coment_id, sum(likes) as suma, sum(dislikes) as suma2 from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.body.book_id};`, function(err, results) {

          res.send(results);
      })

  })
});

bookRouter.post('/:id', urlencodedParser, function(req, res) {


    // select book_coments.user_id, book_coments_like.coment_id, book_coments_like.likes,users.name from book_coments join users on book_coments.user_id=users.id  join  book_coments_like on book_coments.id=book_coments_like.coment_id;
    mysql(`select book_coments.id,book_coments.feedback, book_coments.user_id,book_coments.book_id, book_coments.comment, second.coment_id,suma , suma2 from book_coments left  join  (select coment_id, sum(likes) as suma, sum(dislikes) as suma2 from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.params.id};`, function(err, results) {

        /*
        select book_coments.id,book_coments.book_id,book_coments.user_id,book_coments.comment,book_coments.cur_date,book_coments.feedback ,users.name from book_coments join users on  book_coments.user_id=users.id  left join  (select coment_id, sum(likes) as suma from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.params.id};
        */
        res.send({
            data: results,
            authenticated: req.isAuthenticated()
        });

    })
});
bookRouter.post('/add/comment/:id', urlencodedParser, isLoggedIn, function(req, res) {
    if (req.body.coment.length > 10) {

        var values = {

            book_id: req.params.id,
            user_id: req.session.passport.user,
            comment: req.body.coment,
            cur_date: new Date(),
            feedback: req.body.feedback
        }

        mysql("insert into book_coments set ?", values, function(err, results) {

        })
        mysql('select max(id) as value from book_coments ', function(err, results) {

            var values = {
                coment_id: results[0].value,
                user_id: req.session.passport.user
            }
            mysql(`insert into book_coments_like set ?`, values, function(err, results) {

                mysql(`select book_coments.id,book_coments.feedback, book_coments.user_id,book_coments.book_id, book_coments.comment, second.coment_id,suma ,suma2 from book_coments left  join  (select coment_id, sum(likes) as suma, sum(dislikes) as suma2 from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.params.id};`, function(err, results) {

                    /*
                    select book_coments.id,book_coments.book_id,book_coments.user_id,book_coments.comment,book_coments.cur_date,book_coments.feedback ,users.name from book_coments join users on  book_coments.user_id=users.id  left join  (select coment_id, sum(likes) as suma from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.params.id};
                    */
                    res.send({
                        data: results,
                        authenticated: req.isAuthenticated()
                    });

                })

            })
        })
    }
})
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
