const express = require('express'),

    bodyParser = require('body-parser'),
    goodreads = require('goodreads-api-node'),
    path = require('path'),
    jade = require('jade'),
    /*deprecated*/
    pug = require('pug'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    });
var parser = require('xml2js').Parser({
    explicitArray: false
});
var homeRouter = require('./routes/Home.js');
var authRouter = require('./routes/Auth.js');
var http = require('http');
var mysql = require('./database.js');
/*Authentication*/
var session = require('express-session') //('client-sessions');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var db = require('./db');





passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));
  passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
var app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.post('/myPost',
  passport.authenticate('local', { failureRedirect: '/auth' }),
  function(req, res) {
    res.redirect('/auth');
  });








app.use('/home', homeRouter);
app.use('/auth', authRouter);
/*Authentication*/

/*
http://passportjs.org/docs
https://app.pluralsight.com/player?course=nodejs-express-web-applications&author=jonathan-mills&name=nodejs-express-web-applications-m7&clip=3&mode=live
https://app.pluralsight.com/player?course=expressjs&author=hadi-hariri&name=expressjs-m5&clip=4&mode=live

main exmples
https://github.com/passport/express-4.x-local-example/blob/master/server.js
https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84

https://scotch.io/tutorials/easy-node-authentication-setup-and-local
*/



/*app use*/
//app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
/*app set*/
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
/*Routing*/


/*end Routing*/


app.post('/hello', urlencodedParser, function(req, res) {
    var myName = req.body.name;



    gr.searchBooks({
            q: req.body.name,
            page: req.body.page
        })
        .then(response => {
            var i = 0;
            var values = {
                title: response.search.results.work[i].best_book.title,
                author: response.search.results.work[i].best_book.author.name,
                rating: response.search.results.work[i].average_rating,
                img_big: response.search.results.work[i].best_book.image_url,
                img_small: response.search.results.work[i].best_book.small_image_url,
                rating_count: response.search.results.work[i].ratings_count._,
                category: req.body.name,
                id_2: response.search.results.work[i].id._
            }
            mysql("insert into Books set ?", values, function(err, results) {
                console.log('results ' + results)
            })
            res.end(JSON.stringify(response));
        });
});


app.get('/', function(req, res) {

    res.sendFile(__dirname + '/index.html');

});


/*Goodreads start*/
const myCredentials = {
    key: 'mExu0kDfoVomfHyxT8dIUQ',
    secret: 'rnY7ZovtfboFixLXVFofiG6gx2ua2uVtvar3KyBhs'
};
const gr = goodreads(myCredentials);

/*var getBookId=function(id,cb){

  var options={
    host:'www.goodreads.com',
    path:'/book/title.xml?author=Arthur+Conan+Doyle&key=St2I3lTMKA7zH3c2oJPFFA&title=Hound+of+the+Baskervilles',
    secret:'rnY7ZovtfboFixLXVFofiG6gx2ua2uVtvar3KyBhs'
  }
  var callback=function(response){
    var str='';
    response.on('data',function(chunk){
      str+=chunk;
      console.log('str '+str)
    });
    response.on(end,function(){
      parser.parseString(str,function(err,result){
        console.log('result '+result)
        cb(null,result);
        http.request(options,callback).end();
      })
    })
  }
}
getBookId(1,function(err,result){
  console.log(result)
})
*/



/*gr.getGroupInfo(189072)
    .then(response => {
        result = response


        console.log(result)
    });
    */





var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
