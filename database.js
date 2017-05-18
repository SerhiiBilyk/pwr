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
  connection.end();
*/
}
function findByUserName() {

    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }

}
module.exports = sql_query;
