'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var OrderFilter = function (_React$Component) {
  _inherits(OrderFilter, _React$Component);

  function OrderFilter() {
    _classCallCheck(this, OrderFilter);

    return _possibleConstructorReturn(this, (OrderFilter.__proto__ || Object.getPrototypeOf(OrderFilter)).apply(this, arguments));
  }

  _createClass(OrderFilter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'This is a placeholder for the Order Filter.'
      );
    }
  }]);

  return OrderFilter;
}(React.Component);

var OrderRow = function OrderRow(props) {
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      props.order._id
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
      props.order.created.toDateString()
    ),
    React.createElement(
      'td',
      null,
      props.order.effort
    ),
    React.createElement(
      'td',
      null,
      props.order.effort
    ),
    React.createElement(
      'td',
      null,
      props.order.completionDate ? props.issue.completionDate.toDateString() : ''
    ),
    React.createElement(
      'td',
      null,
      props.order.title
    )
  );
};

function OrderTable(props) {
  var orderRows = props.orders.map(function (issue) {
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
          'Id'
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
          'Effort'
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
}

var OrderAdd = function (_React$Component2) {
  _inherits(OrderAdd, _React$Component2);

  function OrderAdd() {
    _classCallCheck(this, OrderAdd);

    var _this2 = _possibleConstructorReturn(this, (OrderAdd.__proto__ || Object.getPrototypeOf(OrderAdd)).call(this));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(OrderAdd, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.orderAdd;
      this.props.createOrder({
        owner: form.owner.value,
        title: form.title.value,
        status: 'New',
        created: new Date()
      });
      // clear the form for the next input
      form.owner.value = "";form.title.value = "";
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { name: 'orderAdd', onSubmit: this.handleSubmit },
          React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
          React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
          React.createElement(
            'button',
            null,
            'Add'
          )
        )
      );
    }
  }]);

  return OrderAdd;
}(React.Component);

var OrderList = function (_React$Component3) {
  _inherits(OrderList, _React$Component3);

  function OrderList() {
    _classCallCheck(this, OrderList);

    var _this3 = _possibleConstructorReturn(this, (OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call(this));

    _this3.state = { orders: [] };

    _this3.createOrder = _this3.createOrder.bind(_this3);
    return _this3;
  }

  _createClass(OrderList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var _this4 = this;

      var myInit = {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'omit',
        origin: 'http://localhost:3000/'
      };

      fetch('http://localhost:3000/api/orders', myInit).then(function (response) {
        if (response.ok == false) {
          response.json().then(function (data) {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(function (order) {
              order.created = new Date(order.created);
              if (order.completionDate) order.completionDate = new Date(order.completionDate);
            });
            _this4.setState({ orders: data.records });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch orders:" + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:" + err.message, err.message);
      });
    }

    /*
      var xhr = new XMLHttpRequest();
      var method  = 'GET';
      var url     = 'http://localhost:3000/api/orders';
      xhr.open(method, url);
    */

  }, {
    key: 'createOrder',
    value: function createOrder(newOrder) {
      var _this5 = this;

      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (updatedOrder) {
            updatedOrder.created = new Date(updatedOrder.created);
            if (updatedOrder.completionDate) updatedOrder.completionDate = new Date(updatedOrder.completionDate);
            var newOrders = _this5.state.orders.concat(updatedOrder);
            _this5.setState({ orders: newOrders });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to add order: " + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in sending data to server: " + err.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Order Tracker'
        ),
        React.createElement(OrderFilter, null),
        React.createElement('hr', null),
        React.createElement(OrderTable, { orders: this.state.orders }),
        React.createElement('hr', null),
        React.createElement(OrderAdd, { createOrder: this.createOrder })
      );
    }
  }]);

  return OrderList;
}(React.Component);

ReactDOM.render(React.createElement(OrderList, null), contentNode); // Render the component inside the content Node