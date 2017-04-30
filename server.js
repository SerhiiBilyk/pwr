const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    goodreads = require('goodreads-api-node'),
    mysql = require('mysql'),
    path=require('path'),
    jade=require('jade'),

    urlencodedParser = bodyParser.urlencoded({
        extended: false
    });

    var homeRouter= require('./routes/Home.js');
    app.use('/home', homeRouter);


    /*
    MYSQL query

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Thomaskit123!',
        database: 'person'
    });

    connection.connect();

    connection.query('SELECT*FROM Student', function(error, results, fields) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            console.log('The solution is: ', results[i].name);
        }

    });

    connection.end();
    */
  /*app use*/
  //app.use(express.static('public'));
  app.use(bodyParser.urlencoded({
      extended: false
  }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname,'public')));
  /*app set*/
  app.set('view engine','jade');
  app.set('views',__dirname+'/views');
  /*Routing*/


  /*end Routing*/
  app.get('/jade', function (req, res) {
     res.render('empty');
    });

  app.post('/hello', urlencodedParser, function(req, res) {
      var myName = req.body.name;
      var result;
      //console.log('body ' + req.body.name)
      gr.searchBooks({
              q: req.body.name
          })
          .then(response => {
              result = response
              //console.log('searchBooks has been invoked')
              res.end(JSON.stringify(response));
          });
  });


  app.get('/', function(req, res) {
      res.sendFile(__dirname + '/index.html');

  });
/*app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})*/


/*Goodreads start*/
const myCredentials = {
    key: 'mExu0kDfoVomfHyxT8dIUQ',
    secret: 'rnY7ZovtfboFixLXVFofiG6gx2ua2uVtvar3KyBhs'
};
const gr = goodreads(myCredentials);



/*gr.getGroupInfo(189072)
    .then(response => {
        result = response

        //
        console.log(result)
    });*/


// returns page 3 of the search results given the query 'programming'





/*routing*/





var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
