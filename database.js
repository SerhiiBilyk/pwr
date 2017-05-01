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

      if (error) throw error;
      callback(null,results)
  });


  //connection.end();
}


module.exports = sql_query;
