var express = require('express');
var homeRouter = express.Router();
var mysql = require('./../database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});






homeRouter.get('/', function(req, res) {
  var user;/*=req.user.name ||'guest';*/
  if(req.hasOwnProperty('user')){
     user=req.user.name;
  }else{
    user="guest"
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
    console.log('name ' + req.body.name, 'surname ' + req.body.surname)
    var values = {
        name: req.body.name,
        surname: req.body.surname
    }
    mysql("insert into users set ?", values, function(err, results) {
        console.log('results ' + results)
    })

    res.redirect('/home')
});

homeRouter.post('/loadData',urlencodedParser,function(req,res){
  console.log(req.body);

  res.send('load data')
})


homeRouter.get('/test', function(req, res) { //database.remove(req.params.id)


    res.send('hello');
})



module.exports = homeRouter;
