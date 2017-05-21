var mysql = require('../../database.js');

exports.findById = function(id, cb) {
    process.nextTick(function() {
        mysql('select*from users where id=' + id + '', '1', function(err, data) {
            if (data[0].id == id) {

                cb(null, data[0])
            } else {
                cb(null, null);
            }
        });
    });
}


exports.findByUsername = function(username, cb) {
    process.nextTick(function() {

        mysql('select*from users where name=' + "'" + username + "'" + '', '1', function(err, data) {

                if (data[0])  {
                  if(data[0].name==username){
                      return cb(null, data[0]);
                  }
                }else {
                return cb(null, null);
            }
        });
    });
}
