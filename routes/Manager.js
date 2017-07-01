var express = require('express'),
    managerRouter = express.Router(),
    mysql = require('./../database.js'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    transporter = require('../settings/mail'),
    app = express(),
    only = require('../settings/permission_verification'),
    test,
    fs = require('fs');
managerRouter.use(bodyParser.json());





managerRouter.use(only(['manager']));



managerRouter.get('/:name', function(req, res) {
    res.render('manager.pug');
});


managerRouter.get('/load/comments', function(req, res) {
    mysql(`select * from book_coments `, function(err, results) {

        res.send({data:results});
    })


})
managerRouter.post('/update/comment/:id/', urlencodedParser ,function(req,res){

  mysql(`update book_coments set checked=${req.body.index} where id=${req.params.id}`,function(err,results){})
  mysql(`select * from book_coments `, function(err, results) {
    res.send({data:results})
  })

})

module.exports = managerRouter;
