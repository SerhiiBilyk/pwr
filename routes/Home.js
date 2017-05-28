var express = require('express'),
    homeRouter = express.Router(),
    mysql = require('./../database.js'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    });
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
    console.dir(req.body.name);
    var query = "select*from Books where title like '%" + req.body.name + "%' order by rating desc  ";
    console.log(query)
    mysql(query, function(err, results) {
        console.log(results.length);
        res.end(JSON.stringify(results));
    })
});

module.exports = homeRouter;
