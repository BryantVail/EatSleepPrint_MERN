const express       = require('express');
const path          = require('path');
const fs            = require('fs');
const bodyParser    = require('body-parser');
const MongoClient   = require('mongodb').MongoClient;
const morgan        = require('morgan');

const app = express();

app.set('json spaces', 4);
var publicPath = path.resolve(__dirname, "static");



//app.use(express.static(publicPath));
app.use(morgan("default"));
app.use(bodyParser.json());
app.use(function(req, res, next){
    console.log("RequestIP: \t"+ req.ip);
    console.log("Request Date: \t"+ new Date());
    next();
});

app.use(function(req, res, next){
    var filePath = path.join(__dirname, "static", req.url);
    fs.stat(filePath, function(err, fileInfo){
        if(err){
            next();
            return;
        }
        if(fileInfo.isFile()){
            res.sendFile(filePath);
        }else{
            next();
        }
    });
});


app.get('/',(req,res)=>{
    res.redirect("orders.html");
    console.log(req.body.json());
});

app.get('/api/orders', (req,res) => {
    db.collection('orders').find().toArray().then(orders =>{
        
        const metadata = {total_count:orders.length};
        //test console
        console.log('processed "/api/orders"'+orders.forEach(
            function(element){            
                console.log(element._id+"\n");
                }
            )+console.log(metadata.total_count)
        );//end test console
        
        res.json({_metadata: metadata, records:orders});
    }).catch(error =>{
        console.log(error);
        res.status(500).json({message:'Internal Server Error: ${error}'});
    });
});


app.post('/api/orders', (req,res) => {
    const newOrder = req.body;
    newOrder.dateCreated = new Date();

    if(!newOrder.status){
        newOrder.status = "New";
    }
    const err = validateOrder(NewOrder)
        if(err){
            res.status(422).json({message:'invalid request: ${err}'});
            return;
        }    
    db.collection('orders').insertOne(newOrder).then(result =>
        db.collection('orders').find({_id: result.insertedId}).limit(1).next()
    ).then(newOrder =>{
        res.json(newOrder);
    }).catch(error => {
        console.log(error);
        res.status(500).json({message:'Internal Server Error: ${error}'});
    });
});


let db;
MongoClient.connect('mongodb://localhost/OrderTracker').then(connection => {
    db = connection;
    app.listen(3000, () =>{
        console.log('App status:Running, port:3000');
    });
}).catch(error =>{
    console.log('ERROR:', error);
});



