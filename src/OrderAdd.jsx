export default class OrderAdd extends React.Component {
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