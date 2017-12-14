'use strict';

const validOrderStatus = {
    New: true,
    Open: true, 
    Assigned: true, 
    Fixed: true, 
    Verified: true, 
    Closed: true,
};

const orderFieldType = {
    status  :'required',
    user    :'required',
    created :'required',
    completionDate:'required',
    orderName:'required',
    dueDate :'required',
    description:'required',
};

function validateOrder(order){
    for(const field in orderFieldType){
        const type = orderFieldType[field];
        if(!type){
            delete order[field];
        }
        else if(type === 'required' && !order[field]){
            return '${field} is required.';
        }
    }//end for(const field in orderFieldType)

    if(!validOrderStatus[order.status])
        return '${order.status} is not a valid status.';

    return null;
}

module.exports = {
    validateOrder: validateOrder
};





































































