const express       = require('express');
const bodyParser    = require('body-parser');
const MongoClient   = require('mongodb').MongoClient;


const app = express();
app.set('json spaces', 4);
app.use(express.static('static'));
app.use(bodyParser.json());





app.get('/api/orders', (req,res) => {
    const metadata = {total_count:orders.length};
    console.log("sending out JSON now.")
    res.json({_metadata: metadata, records: orders});
});

app.post('/api/orders', (req,res) => {
    const newOrder = req.body;
    newOrder.id = orders.length +1;
    newOrder.dateCreated = new Date();

    if(!newOrder.status){
        newOrder.status = "New";
        orders.push(newOrder);
        res.json(newOrder);
    }
})


let db;
MongoClient.connect('mongodb://localhost/OrderTracker').then(connection => {
    db = connection;
    app.listen(3000, () =>{
        console.log('App status:Running, port:3000');
    });
}).catch(error =>{
    console.log('ERROR:', error);
});



