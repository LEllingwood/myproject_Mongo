// Add code to connect to the server and the database myproject:
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// connection to url:
const url = "mongodb://localhost:27017";

// database name:
const dbName = "myproject";

// use connect method to connect to the server
MongoClient.connect(url, function(err, client){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db,function(){
        indexCollection(db, function(){
            client.close();
        // updateDocuments(db,function(){
            // removeDocument(db, function(){
        // findDocuments(db,function(){
            // this query returns all the documents in the documents collection.
        });
    });
});

// the following uses the insertMany method to add three documents to the documents collection.
const insertDocuments = function(db,callback){
    // get the documents collection
    const collection = db.collection("documents");
    // insert some documents:
    collection.insertMany([
        {a: 1}, {a : 2}, {a : 3}
    ], function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("inserted three documents into the collection");
        callback(result);
});
}

const indexCollection = function(db, callback){
    db.collection("documents").createIndex(
        {"a":1},
        null,
        function(err,results){
            console.log(results);
            callback();
        }
    );
};

// const updateDocuments = function(db, callback){
//     // get the documents collection
//     const collection = db.collection("documents");
//     collection.updateOne({a:2}
//         , { $set: {b:1}}, function(err, result){
//             assert.equal(err,null);
//             assert.equal(1, result.result.n);
//             console.log("Updated the document with the field a equal to 2");
//             callback(result);
//         });
// }

// the following function removes a document
// const removeDocument = function(db, callback){
//     // get the documents collection
//     const collection = db.collection("documents");
//     // Delete document where a is 3
//     collection.deleteOne({a:3}, function(err, result){
//         assert.equal(err, null);
//         assert.equal(1, result.result.n);
//         console.log("removed the document with the field a equal to 3");
//         callback(result);
//     });
// }
// the function below is to find all documents
// const findDocuments = function(db, callback){
//     // get the documents collection
//     const collection = db.collection("documents");
//     // find some documents
//     collection.find({}).toArray(function(err, docs){
//         assert.equal(err,null);
//         console.log("Found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }

// // this finds certain documents with a query filter
// const findDocuments = function(db, callback){
//     // get the documents collection
//     const collection = db.collection("documents");
//     // find some documents
//     collection.find({"a" : 3}).toArray(function(err, docs){
//         // the line above will search only for the document matching "a":3 in the collection
//         assert.equal(err,null);
//         console.log("Found the following records");
//         console.log(docs);
//         callback(docs);
//     });
