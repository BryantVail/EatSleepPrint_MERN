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



let OrderRow = Object.assign(OrderRow, React.Component.prototype);

/*
*   Constructor re-defining only needed when there may be 
*     ->other initiation statements necessary
*/
Object.defineProperty(OrderRow, 
    OrderRow.prototype.constructor, function(props){
        this.props = props;
    });
Object.defineProperty(OrderRow, 
    OrderRow.prototype.render, function(){
        return React.createElement(
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
        );//close tableRow/tr
    });//end function OrderRow.render


let OrderTable= Object.assign({}, React.Component.prototype);
Object.defineProperty(OrderTable, 
    OrderTable.prototype.constructor, 
    function(props){
        this.props = props;
        this.orderRows = props.orders.map(function (order) {
            return React.createElement(OrderRow, { key: order._id, order: order });
        });
    });//end OrderTable.prototype.constructor
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
    });//end OrderTable.render
  
let OrderList = Object.assign({}, React.Component.prototype);
Object.defineProperty(OrderList, 
    OrderList.prototype.componentDidMount,
    function(){
        this.loadData();
    });
Object.defineProperty(OrderList, 
    OrderList.prototype.loadData, 
    function(){

        //init for fetch(url, initObj)
        let myInit = {
            method: "GET",
            mode: "no-cors",
            credentials: "omit",
            origin: "http://localhost:3000/"
        };

        fetch("http://localhost:3000/api/orders", myInit).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log("Total count of records:", data._metadata.total_count);
                    data.records.forEach((order) => {
                        order.dateCreated = new Date(order.dateCreated);
                        if (order.dateCompleted) {
                            order.dateCompleted = new Date(order.dateCompleted);
                        }
                        
                    });
                    this.setState({ orders: data.records });
                });//end response.json
            } else {
                response.json().then(function (error) {
                    alert("Failed to fetch orders:" + error.message);
                });
            }
        }).catch(function (err) {//catch for fetch("http://localhost:3000/api/orders", myInit).then(function (response) {
            alert("Error in fetching data from server:" + err.message, err.message);
        });
    });//end loadData

Object.defineProperty(OrderList, 
    OrderList.prototype.createOrder, 
    function(newOrder){
        fetch("/api/orders", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder)
            }
        ).then(function (response) {
            if (response.ok) {
                response.json().then(function (updatedOrder) {
                    updatedOrder.created = new Date(updatedOrder.created);
                    if (updatedOrder.completionDate) {
                        updatedOrder.completionDate = new Date(updatedOrder.completionDate);
                    }
                    var newOrders = this.state.orders.concat(updatedOrder);
                    this.setState({ orders: newOrders });
                });//end response.json
            } else {
                response.json().then(function (error) {
                    alert("Failed to add order: " + error.message);
                });
            }
        }).catch(function (err) {
            alert("Error in sending data to server: " + err.message);
        });
    });//end createOrder

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