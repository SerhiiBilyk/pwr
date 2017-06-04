var express = require('express'),
    homeRouter = express.Router(),
    mysql = require('./../database.js'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    user;
homeRouter.use(bodyParser.json());
/*
every request checking for user name on navigation bar
*/
homeRouter.use('/*', function(req, res, next) {
    req.hasOwnProperty('user') ?
        user = req.user.name :
        user = "guest"
    next()
})

/**
 *@param {user} if user exist, his name will apear on nav background-color
 * else , name of {user} will be 'guest'
 */
homeRouter.get('/', function(req, res) {

    res.render('home.pug', {
        user: user
    })
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

    var query = "select*from Books where title like '%" + req.body.name + "%' order by rating desc  ";

    mysql(query, function(err, results) {

        res.end(JSON.stringify(results));
    })
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/home');
}
homeRouter.get('/user/:name', isLoggedIn, function(req, res, next) {
    //req.user.name == 'admin' ? next() :
        mysql(`select*from users where name='${req.user.name}'`, function(err, results) {

            results[0].category=='administrator' ? next():
            res.render('user.pug', {
                user: user,
                data: results[0]
            })
        })
})
/*this path only if user has category='administrator'*/
homeRouter.get('/user/:name', isLoggedIn, function(req, res) {
    mysql(`select*from users`, function(err, results) {
      console.dir(results)
        res.render('admin.pug', {
            user: user,
            data: results
        })
    })
})
homeRouter.get('/book/:id', function(req, res) {
    mysql(`select*from books where id=${req.params.id}`, function(err, results) {
        console.dir(results[0])
        res.render('book.pug', {
            user: user,
            data: results[0]
        })
    })



})

module.exports = homeRouter;
