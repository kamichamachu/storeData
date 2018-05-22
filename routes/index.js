var express = require('express');
var router = express.Router();
//LOAD the various controllers

var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//now processing post
//router.post('/storeData', function(req, res, next) {
//expecting data variable called order--retrieve value using body-parser
//var value_name = req.body.order  //retrieve the data associated with order
//res.send("order succesfully received: " + value_name);
//});


//CODE to route /getAllRoutes to appropriate  Controller function
//**************************************************************************
//***** mongodb get all of the Routes in Routes collection w
//      and Render information iwith an ejs view
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);
router.post('/storeData', controllerMongoCollection.storeData);