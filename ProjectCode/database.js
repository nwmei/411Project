var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

function createCollection(collectionName) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection(collectionName, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });
}

function insertIntoCollection(collection, obj) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(collection).insertOne(obj, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });
}

function findAll(collection, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            return callback(result);
        });
    });
}


createCollection("RoadTrips");
var obj = {
    'number': 1,
    'number2': 2
};
insertIntoCollection("RoadTrips", obj);

var employees = findAll("RoadTrips", function(result) {
    console.log(result);
});
