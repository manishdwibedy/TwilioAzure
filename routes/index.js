var express = require('express');
var router = express.Router();
var util = require('util');

var twilioNumber = '+13235700019';
var userNumber = '+12136759581';

//require the Twilio module and create a REST client
var client = require('twilio')('ACe2d36b9110e4149910c8187da43bc45d', 'd5f0564efbf4cfde2d4ed02a863a6459');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Start Tracking the number */
router.get('/startTracking', function(req, res, next){

    var contact = '+1'+req.query.contact;
    console.log('number is' + req.query.contact);

    //Send an SMS text message
    client.sendMessage({
        to: contact, // Any number Twilio can deliver to
        from: twilioNumber, // A number you bought from Twilio and can use for outbound communication
        body: 'Person inside the boundary #SAFE', // body of the SMS message
        StatusCallback: 'http://fencetracking.azurewebsites.net/twilio/messageStatus'

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        messageSent = false;
        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."
            messageSent = true;
            res.send('Message Status : '+messageSent);
        }
        if(err){
            console.log(util.inspect(err, false, null));
            res.send('Error : ' + util.inspect(err, false, null));
        }

    });

});

/* Send a call to the number */
router.get('/sendCall', function(req, res, next){
    var contact = '+1'+req.query.contact;
    console.log('number is' + req.query.contact);

    //Place a phone call, and respond with TwiML instructions from the given URL
    client.makeCall({
        to: contact, // Any number Twilio can deliver to
        from: twilioNumber, // A number you bought from Twilio and can use for outbound communication
        url: 'https://demo.twilio.com/welcome/voice/' // A URL that produces an XML document (TwiML) which contains instructions for the call

    }, function(err, responseData) {

        if(!err){
            console.log('no error');
            res.send('Calling..');
        }
        else{
            // Printing the error object
            console.log(util.inspect(err, false, null));
            res.send('Failed calling '+ contact);
        }
        //executed when the call has been initiated.
        // console.log(responseData.from); // outputs "+14506667788"

    });
    res.send('Call Sent!')
});
/* Send a call to the number */
router.get('/getCall', function(req, res, next){
    var contact = '+1'+req.query.contact;
    client.makeCall({
            to: contact,
            from: twilioNumber,
            url: 'https://demo.twilio.com/welcome/voice/'
        }, function(err, message) {
            console.log(err);
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({
                    message: 'Thank you! We will be calling you shortly.'
                });
            }
        });
});

module.exports = router;
