var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('FB Hello world!');
});


router.get('/verifyUser', function(req, res, next) {
    var token = req.query.authToken;
    console.log('auth token passed is' + req.query.authToken);

    var propertiesObject = { access_token:token };

    // request({url:'https://graph.facebook.com/me', qs:propertiesObject}, function(err, response, body) {
    //     if(err) { console.log(err); return; }
    //     console.log('STATUS: ' + response.statusCode);
    //     console.log('HEADERS: ' + JSON.stringify(response.headers));
    //     response.setEncoding('utf8');
    //     response.on('data', function (chunk) {
    //         console.log('BODY: ' + chunk);
    //     });
    // });

    //Lets configure and request
    request({
        url: 'https://graph.facebook.com/me', //URL to hit
        qs: {access_token: token}, //Query string data
        method: 'GET' //Specify the method
        // headers: { //We can define headers too
        //     'Content-Type': 'MyContentType',
        //     'Custom-Header': 'Custom Value'
        // }
    }, function(error, response, body){
        if(error) {
            console.log('ERROR');
            console.log(error);

            res.send('Auth Status - ' + false );
        } else {
            console.log('DONE');
            console.log(response.statusCode, body);

            var authResult = false
            if(response.statusCode == 200)
            {
                authResult = true;
                FBdata = JSON.parse(body)
                console.log(util.inspect(FBdata, false, null));

                //connect away
                MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
                  if (err) throw err;
                  console.log("Connected to Database");


                	//insert record
                	db.collection('test').insert(FBdata, function(err, records) {
                		if (err) throw err;
                		console.log("Record added as "+records[0]._id);
                	});
                });
            }
            res.send('Auth Status(1) - ' + authResult );
        }
    });
});

module.exports = router;
