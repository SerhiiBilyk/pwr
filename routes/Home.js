var express = require('express');
var homeRouter = express.Router();
var mysql = require('./../database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
homeRouter.use(bodyParser.urlencoded({
    extended: false
}));
homeRouter.use(bodyParser.json());




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
homeRouter.post('/loadData', urlencodedParser, function(req, res) {
    console.dir(req.body.name);
    var query = "select*from Books where title like '%" + req.body.name + "%' limit 10 ";
    console.log(query)
    mysql(query, function(err, results) {
        console.log(results);
        /*res.render('home.pug', {
            books: results
        })*/
        res.end(JSON.stringify(results));
    })


});




homeRouter.get('/test', function(req, res) { //database.remove(req.params.id)
    res.send('hello');
})



module.exports = homeRouter;
