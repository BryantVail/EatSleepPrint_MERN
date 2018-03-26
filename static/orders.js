"use strict";
/* eslint-disable no-alert, no-console */
/* global React, ReactDOM, props*/


let _OrderAdd = require("./OrderAdd.js");
let contentNode = document.getElementById("contents");

let OrderFilter = Object.assign(OrderFilter, React.Component.prototype);
OrderFilter.render = function(){
  return(
    React.createElement("div", null, "This is a Placeholder for Order Filter")
  );
};

/*
*   Constructor re-defining only needed when there may be 
*     ->other initiation statements necessary
*/

//OrderRow{}
let OrderRow = Object.assign(OrderRow, React.Component.prototype);

//constructor()
Object.defineProperty(OrderRow, 
  OrderRow.prototype.constructor, 
  function(props){
    this.props = props;
  });

//render()    
Object.defineProperty(OrderRow, 
  OrderRow.prototype.render, 
  function(){
    return (
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          props.order.user
        ),
        React.createElement(
          "td",
          null,
          props.order.status
        ),
        React.createElement(
          "td",
          null,
          props.order.owner
        ),
        React.createElement(
          "td",
          null,
          props.order.dateCreated.toDateString()
        ),
        React.createElement(
          "td",
          null,
          props.order.effort
        ),
        React.createElement(
          "td",
          null,
          props.order.dateCompleted ? props.order.dateCompleted.toDateString() : "Open"
        ),
        React.createElement(
          "td",
          null,
          props.order.title
        )//end last tableData
      )//close tableRow/tr
    );//end reder() return statement
  });//end function OrderRow.render
//end OrderRow{}    

//OrderTable{}
let OrderTable= Object.assign({}, React.Component.prototype);

//constructor(), init orderRows
Object.defineProperty(OrderTable, 
  OrderTable.prototype.constructor, 
  function(props){
    this.props = props;
    this.orderRows = props.orders.map(function (order) {
      return React.createElement(OrderRow, { key: order._id, order: order });
    });
  }
);//end OrderTable.prototype.constructor

//render()
Object.defineProperty(OrderTable, 
  OrderTable.prototype.render, 
  function(){
    React.createElement(
      "table",
      { className: "bordered-table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "User"
          ),
          React.createElement(
            "th",
            null,
            "Status"
          ),
          React.createElement(
            "th",
            null,
            "Owner"
          ),
          React.createElement(
            "th",
            null,
            "Created"
          ),
          React.createElement(
            "th",
            null,
            "Completion Date"
          ),
          React.createElement(
            "th",
            null,
            "Title"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        this.orderRows
      )
    );
  }
);//end render()
//end OrderTable{}
  
//OrderList{}
let OrderList = Object.assign({}, React.Component.prototype);

//componentDidMount()
Object.defineProperty(OrderList, 
  OrderList.prototype.componentDidMount,
  function(){
    this.loadData();
  });


//loadData()    
Object.defineProperty(OrderList, 
  OrderList.prototype.loadData, 
  function(){

    //init for fetch(url, initObj)
    let myInit = {
      method: "GET",
      mode: "no-cors",
      credentials: "omit",
      origin: "http://localhost:1990/"
    };

    fetch("http://localhost:1990/api/orders", myInit).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach((order) => {
            order.dateCreated = new Date(order.dateCreated);
            if (order.dateCompleted) {
              order.dateCompleted = new Date(order.dateCompleted);
            }
                        
          });
          //setState
          this.setState({ orders: data.records });
        });//end response.json
      } else {
        response.json().then(function (error) {
          alert("Failed to fetch orders:" + error.message);
        });
      }
    }).catch(function (err) {//catch for fetch("http://localhost:1990/api/orders", myInit).then(function (response) {
      alert("Error in fetching data from server:" + err.message, err.message);
    });
  });//end loadData

//createOrder()
Object.defineProperty(OrderList, 
  OrderList.prototype.createOrder, 
  function(newOrder){
    fetch("/api/orders", 
      {
        //init parameter
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      }
    ).then(function (response) {
      if (response.ok) {
        response.json().then(function (updatedOrder) {//in JSON
          updatedOrder.created = new Date(updatedOrder.created);
          if (updatedOrder.completionDate) {
            updatedOrder.completionDate = new Date(updatedOrder.completionDate);
          }
          //if updatedOrder.completionDate is true, then create a new date w/it & update the view 
          // -> to show the successfully persisted new record
          var newOrders = this.state.orders.concat(updatedOrder);
          this.setState({ orders: newOrders });
        });//end response.json
      } else {
        //if else, we know its an error
        response.json().then(function (error) {
          alert("Failed to add order: " + error.message);
        });
      }
    }).catch(function (err) {
      alert("Error in sending data to server: " + err.message);
    });
  });//end createOrder

//render()
Object.defineProperty(OrderList, 
  OrderList.prototype.render, 
  function(){
    return React.createElement(
      "div",
      null,
      React.createElement("h1",null,"OrderTracker"),
      React.createElement(OrderFilter.render, null),
      React.createElement("hr", null),
      React.createElement(OrderTable.render, { orders: this.state.orders }),
      React.createElement("hr", null),
      React.createElement(_OrderAdd.render, { createOrder: this.createOrder })
    );
  });//end render
      
ReactDOM.render(React.createElement(OrderList.render, null), contentNode);