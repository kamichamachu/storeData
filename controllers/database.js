var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://glharvie:nRl40HM8!@ds225840.mlab.com:25840/heroku_mkwg2k9h';


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