'use strict';
const MongoClient = require('mongodb');

function usage(){
    console.log("Usage:");
    console.log('node', _filename, '<option>');
    console.log('Where option is one of:');
    console.log('   callbacks   Use the Callbacks paradigm');
    console.log('   promises    Use the Promises paradigm');
    console.log('   generator   Use the Generator paradigm');
    console.log('   async       Use the async module');
}

if(process.argv.length <3){
    console.log("Incorrect Number of arguments");
    usage();
}
else{
    if(process.argv[2] === 'callbacks') {
        testWithCallbacks();
    }
    else if(process.argv[2] === 'promises'){
        testWithPromises();
    }
    else if(process.argv[2] === 'generator'){
        testWithGenerator();
    }
    else if(process.argv[2] === 'async'){
        testWithAsync();
    }
    else{
        console.log('Invalid option:', process.argv[2]);
        usage();
    }


    function testWithCallbacks(){
        MongoClient.connect('mongodb://localHost/OrderTracker', function(err, db){
            db.collection('orders').insertOne({id:1,name:'A. Callback'}, 
                function(err, result){
                    console.log("Result of insert:", result.insertedID);
                    db.collection('orders').find({id:1}).toArray(function(err,docs){
                        console.log('Result of find:', docs);
                        db.close();
                });
            });
        });
    }//end testWithCallbacks

    function testWithPromises(){
        let db;

        MongoClient.connect('mongodb://localHost/OrderTracker').then(connection => {
            db = connection;
            return db.collection('orders').insertOne({id:1, name:'B. Promises'});
        }).then(result  => {
            console.log('Result of insert:', result.insertedId);
            return db.collection('orders').find({id:1}).toArray();
        }).then(docs => {
            console.log('Result of find:', docs);
            db.close();
        }).catch(err => {
            console.log("ERROR", err);
        });
    }//end testWithPromises

    function testWithGenerator(){
        const co = require('co');
        co(function*(){
            const db = yield MongoClient.connect('mongodb://localHost/OrderTracker');

            const result = yield db.collection('orders').insertOne({id:1, name:'C. Generator'});
            console.log('Result of insert: ', result.insertedId);

            const docs = yield db.collection('orders').find({id:1}).toArray();
            console.log('Result of find:', docs);

            db.close();
        }).catch(err => {
            console.log("Error", err);
        });
    }//end testWithGenerator

    function testWithAsync(){
        const async = require('async');
        let db;
        async.waterfall([
            next => {
                MongoClient.connect('mongodb://localHost/OrderTracker',next);
            }, 
            (connection, next) => {
                console.log('Insert result:', insertResult.insertedId);
                db.collection('employees').find({id:1}).toArray(next);
            }, 
            (docs, next) => {
                console.log('Result of find:', docs);
                db.close();
                next(null, 'All done');
            }
        ], (err, result) => {
            if(err){
                console.log('ERROR', err);
            }
            else {
                console.log(result);
            }
            
        });//end waterfall function 'async.waterfall'
    }






}//end module