/* global __dirname,  */
/* eslint-disable no-alert, no-console */

const express       = require("express");
const path          = require("path");
const fs            = require("fs");
const bodyParser    = require("body-parser");
const MongoClient   = require("mongodb").MongoClient;
const morgan        = require("morgan");
const React         = require("react");

const app = express();

app.set("json spaces", 4);
//let publicPath = path.resolve(__dirname, "static");

//CORS for CDN's
app.use(function(req, res, next){
    let CDNs = []
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
});

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


app.get("/",(req,res)=>{
  res.redirect("orders.html");
  console.log(req.body.json());

});

app.get("/api/orders", (req,res) => {
  db.collection("orders").find().toArray().then(orders =>{
        
    const metadata = {total_count:orders.length};
    //test console
    console.log(`processed "/api/orders" \n${orders.forEach(
      function(element){            
        console.log(element._id+"\n");
      }
    )} \n total count:\t${metadata.total_count}`

    );//end test console
        
    res.json({_metadata: metadata, records:orders, React: React});
  }).catch(error =>{
    console.log(error);
    res.status(500).json({message:`Internal Server Error: ${error}`});
  });
});

const validOrderStatus = {
  New: true,
  UnderReview: true, 
  ActionNeeded: true,
  Quoted: true, 
  PaymentNeeded:true,
  Processing: true, 
  Shipped: true, 
  Complete: true, 
  Cancelled: true
};

const orderFieldType = {
  items: "optional", 
  orderDescription: "required", 
  userID: "required", 
  needByDate: "optional",
  orderTitle: "required"
};

function validateOrder(order){
  for(const field in orderFieldType){
    let type = orderFieldType[field];
    if(!type){
      delete order[field];
    } else if(type === "required" && !order[field]){
      return `${field} is required.`;
    }
  }//end for

  if(!validOrderStatus[order.status]){
    return `${order.status} is not a valid status.`;
  }
  return null;

}//end validateOrder



app.post("/api/orders", (req,res) => {
  const newOrder = req.body;
  newOrder.dateCreated = new Date();

  if(!newOrder.status){
    newOrder.status = "New";
  }
  const err = validateOrder(newOrder);
  if(err){
    return res.status(422).json({message:`invalid request: ${err}`});
  }
     
  db.collection("orders").insertOne(newOrder).then(result =>
    db.collection("orders").find({_id: result.insertedId}).limit(1).next()
  ).then(newOrder =>{
    res.json(newOrder);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message:`Internal Server Error: ${error}`});
  });
});


let db;
let port = 1990;
let mongoPath = "mongodb://localhost/OrderTracker";

MongoClient.connect(`${mongoPath}`).then(connection => {
  db = connection;
  app.listen(1990, () =>{
    console.log(`App status:Running, port:${port}`);
  });
}).catch(error =>{
  console.log(`ERROR: ${error}`);
});



