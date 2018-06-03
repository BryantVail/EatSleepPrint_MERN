const contentNode = document.getElementById('contents');

class OrderFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the Order Filter.</div>
        )
    }
}

const OrderRow = (props) => (
    <tr>
        <td>{props.order._id}</td>
        <td>{props.order.status}</td>
        <td>{props.order.owner}</td>
        <td>{props.order.created.toDateString()}</td>
        <td>{props.order.effort}</td>
        <td>{props.order.effort}</td>
        <td>{props.order.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.order.title}</td>
    </tr>
)

function OrderTable(props) {
    const orderRows = props.orders.map(issue => <OrderRow key={order._id} order={order} />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>{orderRows}</tbody>
        </table>
    );
}

class OrderAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.orderAdd;
    this.props.createOrder({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    // clear the form for the next input
    form.owner.value = ""; form.title.value = "";
  }

  render() {
    return (
      <div>
        <form name="orderAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    )
  }
}

class OrderList extends React.Component {
  constructor() {
    super();
    this.state = { orders: [] };

    this.createOrder = this.createOrder.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {

    var myInit = {
      method:'GET',
      mode:'no-cors',
      credentials: 'omit',
      origin: 'http://localhost:3000/'
    };

    fetch('http://localhost:3000/api/orders', myInit).then(response => {
      if (response.records) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach(order => {
            order.created = new Date(order.created);
            if (order.completionDate)
            order.completionDate = new Date(order.completionDate);
          });
          this.setState({ orders: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch orders:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:"+err.message, err.message);
    });
  }

/*
  var xhr = new XMLHttpRequest();
  var method  = 'GET';
  var url     = 'http://localhost:3000/api/orders';
  xhr.open(method, url);
*/

  createOrder(newOrder) {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedOrder => {
          updatedOrder.created = new Date(updatedOrder.created);
          if (updatedOrder.completionDate)
            updatedOrder.completionDate = new Date(updatedOrder.completionDate);
          const newOrders = this.state.orders.concat(updatedOrder);
          this.setState({ orders: newOrders });
        });
      } else {
        response.json().then(error => {
          alert("Failed to add order: " + error.message)
        });
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  render() {
    return (
      <div>
        <h1>Order Tracker</h1>
        <OrderFilter />
        <hr />
        <OrderTable orders={this.state.orders} />
        <hr />
        <OrderAdd createOrder={this.createOrder}/>
      </div>
    );
  }
}

ReactDOM.render(<OrderList />, contentNode);    // Render the component inside the content Node