// Database config


// module.exports.getListaCnpjs = function(){
//     await client.connect();
//     db = client.db('consultadados');

//     return db.collection('cnpjs').find();

// }

module.exports.getListaCnpjs =  async function() {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("consultadados");
        dbo.collection("cnpjs").find({}).toArray(function (err, result) {
            if (err) throw err;
            return result;
            db.close();
        });
    });


    // const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    // let db;
    // await client.connect();
    // db = client.db('consultadados');


    // db.collection("cnpjs").find({}).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);

    //   });

    // client.close();
}