var express = require('express'),
    homeRouter = express.Router(),
    mysql = require('./../database.js'),
    bodyParser = require('body-parser'),
    only = require('../settings/permission_verification'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    app = express();
homeRouter.use(bodyParser.json());
/*
every request checking for user name on navigation bar
*/


/**
 *@param {user} if user exist, his name will apear on nav background-color
 * else , name of {user} will be 'guest'
 */
homeRouter.get('/', function(req, res) {

    res.render('home.pug')
})
/**
 *@param {delete} {create} for future admin routing
 */
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
    var query;
    req.user ?
        query = `select * from books left outer join user_books on books.id=user_books.book_id and user_books.user_id=${req.session.passport.user} where books.title like '%${req.body.name}%'` :
        query = "select*from Books where title like '%" + req.body.name + "%' order by rating desc ";


    mysql(query, function(err, results) {

        res.end(JSON.stringify(results));
    })

})


function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/home');
}

function isAdministrator(req, res, next) {
    mysql(`select*from users where id='${req.session.passport.user}'`, function(err, results) {
        console.log('Home.js, mysql results', results)

        if (results[0].category == 'administrator' || results[0].category == 'manager') {
            next()
        } else {
            res.redirect('/home')
        }

    })
}
homeRouter.get('/user/:name', isLoggedIn, function(req, res, next) {


    mysql(`select*from users where name='${req.user.name}'`, function(err, profile) {

        mysql(`select books.id, books.title,books.img_big,books.author,user_books.id_ub
          from books
          inner join user_books on books.id=user_books.book_id where user_books.user_id=${profile[0].id};`, function(err, results) {

            res.render('user.pug', {
                profile: profile[0],
                data: results
            })
        })
        /*  res.render('user.pug', {
              user: user,
              data: results[0]
          }) */
    })
})
homeRouter.post('user/:name', isLoggedIn, function(req, res) {
    var results = 'done!';

    res.end(JSON.stringify(results));
})

/*this path only if user has category='administrator'*/
homeRouter.get('/administrator/:name', isLoggedIn, function(req, res) {
    console.log('if administrator')
    mysql(`select*from users where not(name='${req.user.name}')`, function(err, results) {
        console.log('results', results)
        res.render('admin.pug', {
            data: results
        })
    })
})
homeRouter.post('/administrator/:name', only(['administrator','manager']), function(req, res) {


    req.body.change &&
        mysql(`update users set password = '${req.body.password}' where id=${req.body.id}`, function(err, results) {})
    mysql(`select*from users where not(name='${req.user.name}')`, function(err, results) {

        res.send({
            data: results
        })
    })
})



module.exports = homeRouter;
