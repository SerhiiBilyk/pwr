var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const goodreads = require('goodreads-api-node');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




/*app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})*/

var result;
/*Goodreads start*/
const myCredentials = {
  key: 'mExu0kDfoVomfHyxT8dIUQ',
  secret: 'rnY7ZovtfboFixLXVFofiG6gx2ua2uVtvar3KyBhs'
};
const gr = goodreads(myCredentials);
console.log(gr)


  gr.getAuthorInfo(18907)
  .then(response => {
    result=response;
     console.log( response)
   });


app.use(express.static('public'));
/*routing*/
app.get('/hello', function(req, res) {
  res.send(result);
});


app.get('/', function (req, res) {
   res.sendFile(__dirname+'/index.html');

  });





var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
