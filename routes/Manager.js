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
    fs = require('fs'),
    fileUpload = require('express-fileupload'),
    path = require('path');

managerRouter.use(bodyParser.json());
managerRouter.use(fileUpload());
console.log('path',path)



managerRouter.use(only(['manager', 'administrator']));

managerRouter.post('/upload', function(req, res) {
    var img_big = "/uploads/book_img/" + req.files.uploadFile.name;
    var values = {
        title: req.body.title,
        author: req.body.author,
        img_big: img_big,
        img_small: img_big,
        category: req.body.category,
        rating_count:0
    }
    console.log(values)
    mysql("insert into books set ?", values, function(err, results) {
console.log('succesfully inserted')

    })


    console.log('values', values)
    console.log('files : ', req.files)
    req.files.uploadFile.mv("C:/Users/Sergiy/Desktop/Job/PwrProject/public/uploads/book_img/"+req.files.uploadFile.name, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
    mysql('select max(id) as id from books',function(err,result){
      console.log('result max id',result)
        res.redirect('/book/'+result[0].id);
    })


})

managerRouter.get('/:name', function(req, res) {
    res.render('manager.pug');
});


managerRouter.get('/load/comments', function(req, res) {
    mysql(`select id,book_id,user_id,comment,date_format(cur_date, '%d %M %Y') as cur_date, feedback, checked from book_coments;  `, function(err, results) {

        res.send({
            data: results
        });
    })


})
managerRouter.post('/update/comment/:id/', urlencodedParser, function(req, res) {

    mysql(`update book_coments set checked=${req.body.index} where id=${req.params.id}`, function(err, results) {})
    mysql(`select id,book_id,user_id,comment,date_format(cur_date, '%d %M %Y') as cur_date, feedback, checked from book_coments; `, function(err, results) {
        res.send({
            data: results
        })
    })

})

module.exports = managerRouter;
