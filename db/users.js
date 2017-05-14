var mysql = require('../database.js');
var records = [{
    id: 1,
    username: 'jack',
    password: 'secret',
    displayName: 'Jack',
    emails: [{
        value: 'jack@example.com'
    }]
}, {
    id: 2,
    username: 'jill',
    password: 'birthday',
    displayName: 'Jill',
    emails: [{
        value: 'jill@example.com'
    }]
}];
exports.findById = function(id, cb) {
        process.nextTick(function() {
                mysql('select*from users where id='+id+'', '1', function(err, data) {
                    if (data[0].id==id) {
                      console.log('deserializeUser');
                        cb(null, data[0])
                    }else{
                      cb(null,null);
                    }
                });
            });
        }

        /*exports.findById = function(id, cb) {
          process.nextTick(function() {
            console.log('id '+id)
            var idx = id - 1;
            if (records[idx]) {
              cb(null, records[idx]);
            } else {
              cb(new Error('User ' + id + ' does not exist'));
            }
          });
        }*/

        exports.findByUsername = function(username, cb) {
            process.nextTick(function() {
                console.log('start')
                mysql('select*from users where name='+"'"+username+"'"+'', '1', function(err, data) {
                    console.log('nextTick ' + data[0])
                    if(data[0].name==username){
                    return cb(null, data[0]);
                  }else{
                    return cb(null,null);
                  }


                });

            });

        }
