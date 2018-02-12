'use strict';
var _OrderAdd = require('./OrderAdd.js');
var contentNode = document.getElementById('contents');

var OrderFilter = {};
OrderFilter.prototype = React.Component.prototype;
OrderFilter.render = function(){
  return React.createElement('div', null, "This is a Placeholder for Order Filter");
}


var OrderRow = {};
OrderRow.prototype = React.Component.prototype;

OrderRow.render = function(){
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      props.order.user
    ),
    React.createElement(
      'td',
      null,
      props.order.status
    ),
    React.createElement(
      'td',
      null,
      props.order.owner
    ),
    React.createElement(
      'td',
      null,
      props.order.dateCreated.toDateString()
    ),
    React.createElement(
      'td',
      null,
      props.order.effort
    ),
    React.createElement(
      'td',
      null,
      props.order.dateCompleted ? props.order.dateCompleted.toDateString() : 'Open'
    ),
    React.createElement(
      'td',
      null,
      props.order.title
    )//end last tableData
  );//close tableRow/tr
};//end function OrderRow

function OrderTable(props) {
    var orderRows = props.orders.map(function (order) {
      return React.createElement(OrderRow, { key: order._id, order: order });
    });
    return React.createElement(
      'table',
      { className: 'bordered-table' },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            'User'
          ),
          React.createElement(
            'th',
            null,
            'Status'
          ),
          React.createElement(
            'th',
            null,
            'Owner'
          ),
          React.createElement(
            'th',
            null,
            'Created'
          ),
          React.createElement(
            'th',
            null,
            'Completion Date'
          ),
          React.createElement(
            'th',
            null,
            'Title'
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        orderRows
      )
    );
  }//end React.createElement('table',,)
  
    var OrderList = {};
    OrderList.prototype = React.Component.prototype;
        OrderList.componentDidMount = function(){
            this.loadData();
        };
        OrderList.loadData = function(){
            var myInit = {
                method: 'GET',
                mode: 'no-cors',
                credentials: 'omit',
                origin: 'http://localhost:3000/'
            };

            fetch('http://localhost:3000/api/orders', myInit).then(function (response) {
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
                });
                } else {
                response.json().then(function (error) {
                    alert("Failed to fetch orders:" + error.message);
                });
                }
            }).catch(function (err) {
                alert("Error in fetching data from server:" + err.message, err.message);
            });
        };//end loadData

        OrderList.createOrder = function(newOrder){
            fetch('/api/orders', 
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                  });
                } else {
                  response.json().then(function (error) {
                    alert("Failed to add order: " + error.message);
                  });
                }
              }).catch(function (err) {
                alert("Error in sending data to server: " + err.message);
              });
        };//end createOrder

        OrderList.render = function(){
            return React.createElement(
                'div',
                null,
                React.createElement('h1',null,'OrderTracker'),
                React.createElement(OrderFilter.render, null),
                React.createElement('hr', null),
                React.createElement(OrderTable.render, { orders: this.state.orders }),
                React.createElement('hr', null),
                React.createElement(_OrderAdd.render, { createOrder: this.createOrder })
              );
        };//end render
      
        ReactDOM.render(React.createElement(OrderList.render, null), contentNode);