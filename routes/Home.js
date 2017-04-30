var express = require('express');
var homeRouter = express.Router();
var database=require('./../database.js');
console.log(database.db);

homeRouter.get('/', function(req, res) {
    res.render('empty',{title:database.db})
})
homeRouter.get('/contact', function(req, res) {
    res.send('Home contact')
})
homeRouter.get('/delete/:id', function(req, res) {
  //database.remove(req.params.id)
  database.remove(req.params.id)

    res.redirect('/Home')
})



module.exports = homeRouter;
