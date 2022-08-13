const {MongoClient} = require('mongodb');
const Db_Url = process.env.MONGO_URL;
const client = new MongoClient(Db_Url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

let _db

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      //Verify if we got a good  "db" object
      if (db) {
        _db = db.db("escrow");
        console.log("Successfully connected to MongoDB.");
      } 
      return callback(err);
    })
  },
  
  getDb: function () {
    return _db
  }
}