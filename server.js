const express   = require('express');
const bodyParser= require('body-parser');
const app       = express();

app.set('json spaces', 4);

app.use(express.static('static'));
app.use(bodyParser.json());



const orders = [

    {
        id:1, status:"Open", user: "Raven", dateCreated: new Date("2016-08-15"), 
        total:5, dateCompleted: undefined, title:'Holiday Rush',
    }, 
    {
        id:2, status:'Assigned', user:'EddieA', dateCreated: new Date('2016-08-16'), 
       total:14, dateCompleted: new Date('2016-08-30'), title:'Lawn Monkeys', 
    },
];//end orders array

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

app.listen(3000, () => {
    console.log('App Started on port 3000');
});

