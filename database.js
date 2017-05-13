var mysql = require('mysql');
var answer;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thomaskit123!',
    database: 'person'
});
var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];
connection.connect();
function sql_query(query,values,callback) {


  connection.query(query, values, function(error, results, fields) {

      if (error) throw error;
      callback(null,results)
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
