"strict mode";
/* global React, ReactDOM, props */
/* eslint-disable no-console, no-alert*/
let OrderAdd = require("./OrderAdd"); 
let createClass = React.createClass;
var contentNode = document.getElementById("contents");
//var createClass = require('create-react-class');

//var React       = require('react');
var create      = React.createElement;


let OrderFilter = Object.assign({}, React.Component);
Object.defineProperty(OrderFilter, 
    OrderFilter.prototype.render, 
    function(){
        return (
            create("div", {className:"filter"}, 
                `this is a placeholder, \n${this}`
            )
        );
    }
);



var OrderRow = createClass({
    propTypes:{
        /*
        user: React.PropTypes.string.isRequired,
        dueDate: React.PropTypes.Date.isRequired,
        orderState: React.PropTypes.string.isRequired,
        balance:React.PropTypes.number.isRequired,
        orderTotal:React.PropTypes.number.isRequired,
      */
    },
    render: function(){
        return(
            create("tr", null, 
                create("td", null, props.order.user), 
                create("td",null,props.order.dueDate.toDateString()),
                create("td",null,props.order.dateCreated.toDateString()),
                create("td",null,props.order.orderState),
                create("td",null,props.order.balance),
                create("td",null,props.order.orderTotal)
            )
        );
    },
});


    

var OrderTable = createClass({

    propTypes:{

    },
    OrderRows :function(){
        return(
            
            this.props.orders.map(function(order){
                return(
                    create(OrderRow, {key:order._id, order:order})
                );
            })
        );
    },
    render: function(){
        return(
            create("table",null,
                create("thead",null,
                    create("tr",null,
                        create("th",null,"User"),
                        create("th",null,"Due Date"),
                        create("th",null,"Created"),
                        create("th",null,"Status"),
                        create("th",null,"Balance"),
                        create("th",null,"Order Total")
                    )//end tr
                ),//end thead
                create("tbody",null,this.OrderRows())
            )//end table
        );//end return
    },
});//end OrderTable

var OrderList = createClass({
    propTypes:{

    },
    render:function(){
        return(
            create("div", {}, 
                create("h1",{}, "Orders"),
                create("hr",{}),
                create(OrderFilter, {}),
                create(OrderTable, {orders: this.state}), 
                create(OrderAdd, {createOrder: this.createOrder})
            )//end opening div
        );
    },

    componentDidMount: function(){
        this.LoadData();
    },

    LoadData: function(){
        var myInit = {
            method:"GET",
            mode: "no-cors",
            credentials:"omit",
            origin:"http://localhost:3000/"
        };
        fetch("http://localhost:3000/api/orders", myInit).then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(`Total Count of Records:${data._metadata.total_count} `);
                    data.records.forEach((order)=>{
                        order.dateCreated = new Date(order.dateCreated);
                        if(order.dateCompleted){
                            order.dateCompleted = new Date(order.dateCompleted);
                        }
                    });//end foreach
                    this.setState({orders: data.records});
                });//end response.json
            }//end if(response.ok)
            else{
                response.json().then(function(error){
                    alert("failed to fetch orders: "+error.message);
                });
            }//end if(response.ok)>else
        }).catch(function(error){
            alert(`error in fetching data from server: ${error.message}`);
        });
    },

    CreateOrder: function(newOrder){
        fetch("api/orders", {
            method:"POST",
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(newOrder)
        }).then(function(response){
            if(response.ok){
                response.json().then(function(updatedOrder){
                    updatedOrder.createdDate = new Date(updatedOrder.createdDate);
                    if(updatedOrder.completionDate){
                        updatedOrder.completionDate = new Date(updatedOrder.completionDate);
                    }
                    var newOrders = this.state.orders.concat(updatedOrder);
                    this.setState({orders: newOrders});
                });
            }else{
                response.json().then(function(error){
                    alert("failed to add order: " +error.message);
                });
            }//end if else
        }).catch(function(error){
            alert("error sending object to server: " + error.message);
        });
    }//end CreateOrder
}); //end createClass(OrderList)
  


    //}(React.Component);
var rootElement = create("div", {}, 
    create(OrderList, {})
);
      
ReactDOM.render(rootElement, contentNode); // Render the component inside the content Node