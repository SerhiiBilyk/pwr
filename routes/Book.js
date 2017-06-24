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
bookRouter.post('/like/:id', function(req, res) {

    mysql(`update book_coments_like set likes = 1 where coment_id=${req.body.coment_id} and user_id=${req.session.passport.user}`, function(err, results) {
        mysql(`select book_coments.id,book_coments.feedback, book_coments.user_id,book_coments.book_id, book_coments.comment, second.coment_id,suma from book_coments left  join  (select coment_id, sum(likes) as suma from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.params.id};`, function(err, results) {
console.log('last results',results)
            res.end(JSON.stringify(results));
        })
    })
});
bookRouter.post('/dislike/:id', function(req, res) {

    mysql(`update book_coments set dislikes = dislikes + 1 where id=${req.params.id}`, function(err, results) {
        mysql(`select book_coments.id, book_coments.comment,book_coments.feedback, book_coments.likes,book_coments.dislikes,  date_format(book_coments.cur_date,'%d/%m/%Y') as cur_date, users.name from book_coments join users on book_coments.user_id=users.id and book_coments.book_id=${req.body.book_id};`, function(err, results) {
            res.end(JSON.stringify(results));
        })
    })
});

bookRouter.post('/:id', urlencodedParser, function(req, res) {
console.log('!!!!!!!!!!!!start load !!!!!!!!!!!!')
    if (req.body.coment.length > 10) {
console.log('start inseert coment')
        var values = {

            book_id: req.params.id,
            user_id: req.session.passport.user,
            comment: req.body.coment,
            cur_date: new Date(),
            feedback: req.body.feedback
        }

        mysql("insert into book_coments set ?", values, function(err, results) {
            console.log('first query')
        })
        mysql('select max(id) as value from book_coments ', function(err, results) {
            console.log('second query max ID result', results)
            var values = {
                coment_id: results[0].value,
                user_id: req.session.passport.user
            }
            mysql(`insert into book_coments_like set ?`, values, function(err, results) {
                console.log('third query')
            })
        })
    }
    // select book_coments.user_id, book_coments_like.coment_id, book_coments_like.likes,users.name from book_coments join users on book_coments.user_id=users.id  join  book_coments_like on book_coments.id=book_coments_like.coment_id;
    mysql(`select book_coments.id,book_coments.feedback, book_coments.user_id,book_coments.book_id, book_coments.comment, second.coment_id,suma from book_coments left  join  (select coment_id, sum(likes) as suma from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.params.id};`, function(err, results) {
        console.log('third query global ', results)
        /*
        select book_coments.id,book_coments.book_id,book_coments.user_id,book_coments.comment,book_coments.cur_date,book_coments.feedback ,users.name from book_coments join users on  book_coments.user_id=users.id  left join  (select coment_id, sum(likes) as suma from book_coments_like group by coment_id) second on book_coments.id=second.coment_id where book_coments.book_id=${req.params.id};
        */
        res.send({
            data: results,
            authenticated: req.isAuthenticated()
        });

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
