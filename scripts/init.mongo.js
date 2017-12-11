db = new Mongo().getDB('OrderTracker');

db.orders.remove({});

db.orders.insert([
        {
                    status:"Open", user: "Raven", dateCreated: new Date("2016-08-15"), 
            total:5, dateCompleted: undefined, title:'Holiday Rush',
        }, 
        {
            status:'Assigned', user:'EddieA', dateCreated: new Date('2016-08-16'), 
           total:14, dateCompleted: new Date('2016-08-30'), title:'Lawn Monkeys', 
        },
]);

db.orders.createIndex({status:1});
db.orders.createIndex({dateCompleted:1});
db.orders.createIndex({createdDate:1});
db.orders.createIndex({user:1});