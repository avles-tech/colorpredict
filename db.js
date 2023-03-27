var Datastore = require('nedb')
    , db = new Datastore({ filename: '/var/data/avles/colorpredict/db/game.db', autoload: true });


const loadDB = () => {
    db.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
        if (err) console.log(err);
    });
}

const create = async (data) => {
   db.count({period : data.period},function (err, count) {
        if(count> 0){
            db.update({ period: data.period }, { $set: { price: data.price } }, { multi: false }, function (err, numReplaced) {
                console.log(numReplaced);          
                return;
              });
        }
        else{
            db.insert(data, function (err, newDoc){
                if (err) {
                console.log(err);            
                }
                return;
            });
        }
      });
}

const count = async (query) => {
    db.count(query,function (err, count) {
         return count;
       });
 
     
 }

const readAll = () => {

    return db.getAllData();
}

module.exports = { loadDB , create ,readAll, count};