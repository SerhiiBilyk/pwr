const express = require('express'),
    /*Basic tools*/
    bodyParser = require('body-parser'),
    goodreads = require('goodreads-api-node'),
    path = require('path'),
    pug = require('pug'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    http = require('http'),
    parser = require('xml2js').Parser({
        explicitArray: false
    }),
    /*Routing*/
    homeRouter = require('./routes/Home.js'),
    authRouter = require('./routes/Auth.js'),
    bookRouter = require('./routes/Book.js'),
    managerRouter = require('./routes/Manager.js'),
    //  adminRouter = require('./routes/Admin.js'),
    /*Database*/
    //  mysql = require('./database.js'),
    /*Authentication*/
    session = require('express-session'),
    passport = require('passport'),
    verification = require('./settings/user_verification'),
    Strategy = require('passport-local').Strategy,
    flash = require('connect-flash'),
    /*Emails*/
    transporter = require('./settings/mail');


/**
 *@param {username} name of input field views/login.pug
 *@param {password} name of input field views/login.pug
 */
passport.use(new Strategy(
    function(username, password, cb) {
        verification.users.findByUsername(username, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false, {
                    /*@param flash message*/
                    message: 'Please enter correct user name'
                });
            }
            if (user.password != password) {
                return cb(null, false, {
                    message: 'Please enter correct password'
                });
            }
            return cb(null, user);
        });
    }));
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    verification.users.findById(id, function(err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});
var app = express();
app.locals.mysql = require('./database.js');
app.locals.isLoggedIn = function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/home');
}


/*What is this?
app.use(require('morgan')('combined'));
*/
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
    extended: true
}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 60000 * 1000
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.post('/authentication',
    passport.authenticate('local', {
        failureRedirect: '/auth/login',
        failureFlash: true
    }),
    function(req, res) {
        res.redirect('/');
    });

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
/*for future profile routing*/
app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {

        res.render('empty.pug', {
            title: req.user,
            session: req.session.passport.user
        });
    });

app.use('/*', function(req, res, next) {

    if (req.hasOwnProperty('user')) {
        res.locals.user = req.user.name
        res.locals.category=req.user.category


    } else {

        res.locals.user = 'guest'
        res.locals.category='user'

    }
    next()
})
app.use('/home', homeRouter);
app.use('/auth', authRouter);
app.use('/book', bookRouter);
app.use('/home/manager', managerRouter);
//app.use('/admin', authRouter);


/*Authentication*/

/*
http://passportjs.org/docs
https://app.pluralsight.com/player?course=nodejs-express-web-applications&author=jonathan-mills&name=nodejs-express-web-applications-m7&clip=3&mode=live
https://app.pluralsight.com/player?course=expressjs&author=hadi-hariri&name=expressjs-m5&clip=4&mode=live

main examples
https://github.com/passport/express-4.x-local-example/blob/master/server.js
https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84

https://scotch.io/tutorials/easy-node-authentication-setup-and-local

Also read about sesisons, and store session objects

//TO DO LIST

# start with testing tools (JS,NODE)

#add more features to profile (foto, change password)

# add better css layout to book page (with coments)
# add posibility to delete coment by manager in admin panel and add notification for admin if coment added
# optimize funtion isAdministrator, whis is in auth and home routings
# add permissions for manager
# Nodejs ACL Poles and Permissions https://gist.github.com/facultymatt/6370903
# very good article https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1
# Active routing - Auth.js
# get layout from animated page from git hub and infinity slider and add to page, use convert from HTML to pug
# good article about using variables in Node Js and Pug -> https://gist.github.com/joepie91/c0069ab0e0da40cc7b54b8c2203befe1
# https://webapplog.com/jade/
https://www.sitepoint.com/jade-tutorial-for-beginners/
wrapp MySQL function in promise

*/




app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());





app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');




/** Main database generator
 * @param {req.body.name} ->book title
 * @param {req.body.page} ->Goodreads API page
 * do request on start page localhost:8081
 * {CtrlController} responsible for AJAX post request
 */
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

            })
            res.end(JSON.stringify(response));
        });
});

/*in future this path will redirect to /home*/
/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
*/
app.get('/', function(req, res) {
    res.render('index.pug');
});

/*Goodreads start*/
const myCredentials = {
    key: 'mExu0kDfoVomfHyxT8dIUQ',
    secret: 'rnY7ZovtfboFixLXVFofiG6gx2ua2uVtvar3KyBhs'
};
const gr = goodreads(myCredentials);
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
