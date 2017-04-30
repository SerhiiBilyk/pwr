var database = {
    id: 0,
    list: function() {
        return this.db;
    },
    remove: function(id) {
        this.db.splice(id, 1);
        console.log(this.db[id])
    },
    db: [{
        name: 'John',
        surname: 'Doe',
        id: 0
    }, {
        name: 'Bruce',
        surname: 'Wane',
        id: 1
    }]
}
module.exports = database;
