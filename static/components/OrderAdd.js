//var createClass = require('create-react-class');
/* eslint-disable no-console, no-alert*/
/* global React  */

var create = React.createElement;
//let createClass = React.CreateClass;

let OrderAdd = Object.assign({}, React.Component);

Object.defineProperty(OrderAdd, 
    OrderAdd.prototype.propTypes, new Array());

//render()
Object.defineProperty(OrderAdd, 
    OrderAdd.prototype.render, 
    function(){
        return(
            create("div",{}, 
                create("form", {name:"orderAdd", onSubmit:this.handleSubmit}, 
                //sign in logic method
                    create("input",{placeholder:"Order Name",name:"orderName"}),
                    create("label",{},"Apparel Type: ", 
                        create("select", {required:true, name:"itemType"},
                            create("optgroup",{label:"Shirt"},
                                create("option", {value:"t-shirt"}, "T-Shirt"),
                                create("option", {value:"polo"}, "Polo"),
                                create("option", {value:"longsleeve"}, "Long Sleeve"),
                                create("option", {value:"tank"}, "Tank"),
                                create("option", {value:"sleeveless"}, "Sleeveless")
                            ),
                            create("optgroup", {label:"Hat"}, 
                                create("option", {value:"ballCap"}, "Ball Cap"),
                                create("option",{value:"beanie"}, "Beanie"), 
                                create("option",{value:"fedora"},"Fedora"), 
                                create("option",{value:"beret"}, "Beret")
                            ),//end optgroup hat
                            create("option", {value:"shorts"}, "Shorts"), 
                            create("option", {value:"pants"}, "Pants")
                        )//end select element          
                    ),//end label "Apparel Type: "
                    create("label", {}, "Brand/Material", 
                        create("select",{required:false, name:"materialBrand"}, 
                            create("optgroup",{label:"Material"},
                                create("option", {value:"cottonPoly"}, "Cotton-Poly Blend"),
                                create("option",{value:"cotton"}, "100% Cotton" ),
                                create("option", {value:"polyester"}, "Polyester"),
                                create("option", {value:"wool"}, "Wool")
                            ),//end optgroup
                            create("optgroup", {value:"Brand"},
                                create("option", {value:"nike"}, "Nike"),
                                create("option", {value:"columbia"}, "Columbia"),
                                create("option", {value:"other"}, "Other")
                            )//end brand
                        )//end brand material    
                    ),//end select brandmaterial
                    create("label", {value:"Description"}, 
                        create("input", 
                            {
                                type:"textarea",
                                name:"description", 
                                required:true, 
                                columns:60, 
                                rows:5, 
                                wrap:"hard", 
                                placeholder:"Description", 
                            })
                    ),//end description
                    create("button",{type: "submit"},"Add")
                )//end form element
            )//end opening div 
        );
    });//end OrderAdd.prototype.render: function(){ 
//componentDidMount()
Object.defineProperty(OrderAdd, 
    OrderAdd.prototype.componentDidMount, 
    function(){
        this.LoadPrintItemForm();
    }
); 

//LoadPrintItemForm
Object.defineProperty(OrderAdd, 
    OrderAdd.prototype.LoadPrintItemForm, 
    function(){
    }
);

//handleSubmit()
Object.defineProperty(OrderAdd, 
    OrderAdd.prototype.handleSubmit, 
    function(e){
        e.preventDefault();
        var form = document.forms.orderAdd;
        this.props.createOrder({
            orderName: form.orderName.value,
            apparelType: form.itemType.value, 
            materialBrand: form.materialBrand.value,
            description:form.description.value,
            status: "New",
            dateCreated: new Date(),
            userID: "01230451118"
        });

        //clear the form
        form.orderName.value = ""; form.itemType.value = null; form.materialBrand.value = null; form.description.value = "";
    }
);//end OrderAdd.prototype.handleSubmit




module.exports = OrderAdd;