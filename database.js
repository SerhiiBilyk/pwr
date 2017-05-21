var mysql = require('mysql');
var answer;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thomaskit123!',
    database: 'person'
});

connection.connect();
function sql_query(query,values,callback) {


  connection.query(query, values, function(error, results, fields) {
      if (error){
        console.log('database error')
      }else{
      callback(null,results)
      }

  });

/*
* read node mysql documentation about  connection.end();
* if you uncomment this line, every second mysql query will cause an error
*/
}

module.exports = sql_query;
