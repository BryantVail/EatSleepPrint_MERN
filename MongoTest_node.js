var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();

var URL = 'mongodb://localhost/OrderTracker';

MongoClient.connect(URL, function(err,db){
    if(err) return

    var collection = db.collection('orders');
    console.log(collection);


});










































