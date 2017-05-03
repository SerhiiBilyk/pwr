const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    goodreads = require('goodreads-api-node'),
    path=require('path'),
    jade=require('jade'),/*deprecated*/
    pug=require('pug'),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    });
    var parser= require('xml2js').Parser({explicitArray:false});
    var homeRouter= require('./routes/Home.js');
    var http=require('http');
    var mysql = require('./database.js');


    app.use('/home', homeRouter);




  /*app use*/
  //app.use(express.static('public'));
  app.use(bodyParser.urlencoded({
      extended: false
  }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname,'public')));
  /*app set*/
  app.set('view engine','pug');
  app.set('views',__dirname+'/views');
  /*Routing*/


  /*end Routing*/


  app.post('/hello', urlencodedParser, function(req, res) {
      var myName = req.body.name;

      //console.log('body ' + req.body.name)

        gr.searchBooks({
                q: req.body.name,
                page:req.body.page
            })
            .then(response => {
              /*  for(var i=0;i<response.search.results.work.length;i++){
                  console.log("I: "+response.search.results.work[i].best_book.title)
                }*/
                var i=0;
                if(i==0){
                var values={
                  title:response.search.results.work[0].best_book.title,
                  author:response.search.results.work[0].best_book.author.name,
                  rating:response.search.results.work[0].average_rating,
                  img_big:response.search.results.work[0].best_book.image_url,
                  img_small:response.search.results.work[0].best_book.small_image_url,
                  rating_count:response.search.results.work[0].ratings_count._
                }
                mysql("insert into Books set ?", values, function(err, results) {
                    console.log('results ' + results)
                })
                i=i+1;
              }

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
