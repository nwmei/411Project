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

function findAll(collection, query, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(collection).find(query).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            return callback(result);
        });
    });
}


function dropCollection(collection) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(collection).drop(function(err, delOK) {
            db.close();
        });
    });
}


var obj = {
    'origin': "boston, ma",
    'destination': "san francisco, ca"
};
insertIntoCollection("RoadTrips", obj);

var mongo = require('mongodb');
var o_id = new mongo.ObjectID('5caa53aff090e2543043da8d');
var query = { _id: o_id };

var employees = findAll("RoadTrips", query,function(result) {
    console.log(result);
});
