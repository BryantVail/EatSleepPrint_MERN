const contentNode = document.getElementById('contents');

class OrderFilter extends React.Component{
    render(){
        return(
            <div> This is a placeholder for Order Filter. </div>
        )
    }
}

const OrderRow = (props)=> (

    <tr>
        <td>{props.order.id}</td>
        <td>{props.order.status}</td>
        <td>{props.order.user}</td>
        <td>{props.order.dateCreated}</td>
        <td>{props.order.total}</td>
        <td>{props.order.completedDate ? props.order.completionDate.toDateString() : ''}</td>
        <td>{props.order.title}</td>
    </tr>
)
//end OrderRow


function OrderTable(props){
    const orderRows = props.orders.map(order => <OrderRow key={order.id} order={order} /> )
        return(
            <table className="bordered-table" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Date Created</th>
                        <th>Total Cost</th>
                        <th>Completion Date</th>
                        <th>Title </th>
                    </tr>
                </thead>
                <tbody>
                    {orderRows}
                </tbody>
            </table>
        );

}//end IssueTable




class OrderAdd extends React.Component {
   constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(e){
            e.preventDefault();
            var form = document.forms.orderAdd;
            this.props.createOrder({
                user:      form.user.value,
                title:      form.title.value,
                status:     "New",
                created:    new Date(),
            });

            //clear text fields
            form.user.value = "";  form.title.value= "";
        }
    render(){
        return(

            <div>
                <form name="orderAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="user" placeholder="UserName" />
                    <input type ="text" name="title" placeholder="Title" />
                    <button>Add</button>
                </form >  
            </div>
        )
    }
}//end OrderAdd


class OrderList extends React.Component {//list of objects for the UI
    constructor(){
        super();
        this.state = {orders : []};

        this.createOrder = this.createOrder.bind(this);
    }//end constructor

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch('/api/orders').then(response =>
            response.json()
        ).then(data => {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(order => {
                order.createdDate = new Date(order.dateCreated);
                if(order.completionDate){
                    order.completionDate = new Date(order.completionDate);
                }
            });
            this.setState({orders: data.records});
        }).catch(err => {
            console.log(err);
        });
    }

    createOrder(newOrder){
        fetch('api/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newOrder), 
        }).then(response => response.json()
        ).then(updatedOrder => {
            upatedOrder.created = new Date(updatedOrder.created);
            if(updatedOrder.completionDate){
                updatedOrder.completionDate = new Date(updatedOrder.completionDate);
            }
                const newOrders = this.state.orders.concat(updatedOrder);
                this.setState({orders: newOrders});
        }).catch(err => {
            alert("Error in sending data to server: "+ err.message);
        });
    }//end createOrder     

    render(){
        return(
            <div>

                <OrderFilter />
                <hr/>

                <OrderTable orders={this.state.orders} />
                
                <hr />
                <OrderAdd createOrder= {this.createOrder} />
            </div>
        );
    }
}



ReactDOM.render(<OrderList />, contentNode); //render the component inside the content node












