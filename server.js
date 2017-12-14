const express       = require('express');
const bodyParser    = require('body-parser');
const MongoClient   = require('mongodb').MongoClient;


const app = express();
app.set('json spaces', 4);
app.use(express.static('static'));
app.use(bodyParser.json());





app.get('/api/orders', (req,res) => {
    
    db.collection('orders').find().toArray().then(orders =>{
        console.log('processed "/api/orders"');
        const metadata = {total_count:orders.length};
        
        res.json({_metadata: metadata, records:orders})
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



