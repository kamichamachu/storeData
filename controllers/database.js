var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://glharvie:nRl40HM8!@ds225840.mlab.com:25840/heroku_mkwg2k9h';


module.exports.storeData = function(request, response){

        var fullname = request.body.fullname;
        var shippingaddress = request.body.shippingaddress;
        var shippingstate = request.body.shippingstate;
        var city = request.body.city;
        var zip = request.body.zip;
        var email = request.body.email;
        var cardname = request.body.cardname;
        var billingaddress = request.body.billingaddress;
        var billingcity = request.body.billingcity;
        var billingstate = request.body.billingstate;
        var billingzip = request.body.billingzip;
        var cardnumber = request.body.cardnumber;
        var expmonth = request.body.expmonth;
        var expyear = request.body.expyear;
        var cardtype = request.body.cardtype;
        var cvv = request.body.cvv;
        var orderTotal = request.body.orderTotal;
        var order = request.body.order;

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client)  {
        if(err) throw err;


        //get handle to the databse
        var theDatabase = client.db('heroku_mkwg2k9h');


        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        var orderID = Math.floor((Math.random() * 1000000000000) + 1);

        //customer collection operation
        var CUSTOMERS = theDatabase.collection('CUSTOMERS');

        var customerdata = {
            _id: customerID,
            FULLNAME: fullname,
            STREET: shippingaddress,
            CITY: city,
            STATE: shippingstate,
            ZIP: zip,
            EMAIL: email
        };

        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        });

        var BILLING = theDatabase.collection('BILLING');

        var billingdata = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDTYPE: cardtype,
            CREDITCARDNUMBER: cardnumber,
            CREDITCARDEXP: expmonth + ' ' + expyear,
            CREDITCARDSECURITYNUM: cvv
        };

        BILLING.insertOne(billingdata, function (err, result) {
            if (err) throw err;
        });

        var SHIPPING = theDatabase.collection('SHIPPING');

        var shippingdata = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: shippingaddress,
            SHIPPING_CITY: city,
            SHIPPING_STATE: shippingstate,
            SHIPPING_ZIP: zip
        };

        SHIPPING.insertOne(shippingdata, function (err, result) {
            if (err) throw err;
        });

        var Orders = theDatabase.collection('ORDERS');

        var orderdata = {
            _id: orderID,
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear(),
            PRODUCT_VECTOR: order,
            ORDER_TOTAL: orderTotal
        };

        Orders.insertOne(orderdata, function (err, result) {
            if (err) throw err;
        });

        Orders.find({}).toArray(function (err, docs) {
            if(err) throw err;

            response.render('storeData', {results: docs});

        });

        //close connection when your app is terminating
        client.close(function (err) {
            if(err) throw err;
        });
    });//end of connect

};
/** getAllRoutes controller logic that current does model logic too -connects to Mongo database and
 * queries the Routes collection to retrieve all the routes and build the output usig the
 * ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;


        //get handle to the databse
        var theDatabase = client.db('heroku_mkwg2k9h');


        //get collection of routes
        var Orders = theDatabase.collection('ORDERS');


        Orders.find({}).toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });

        //close connection when your app is terminating
        client.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function