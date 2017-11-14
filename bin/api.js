var bodyparser = require('body-parser');
var querystring = require('querystring');
const fs = require('fs');
var db = require('./logic');
const handlebars = require('handlebars');
var showtpl = function (file, data, status){
    var exists = fs.readFileSync(`billing/`+file+`.html`),
        f = exists.toString('utf-8');
    return handlebars.compile(f)({status:status, message: data})    
}
module.exports = function (express) {
    // home page route (http://localhost:3000)
    //get list of billing categories
    var api = express.Router();
    var requester = require('./requester');
    var bill = require('./bill');
    api.use(bodyparser.json());
    api.use(bodyparser.urlencoded({ extended: true }));
    api.get('/list', function (req, res) {
        requester.lists(function (data, status) {
            if (data.data !== undefined) {
                res.status(status).send(data.data);
            } else { res.status(status).send(data); }
        });
    });
    // about page route (http://localhost:3000/about)
    api.get('/list/:category', function (req, res) {
        //get list of billers that are in a category say airtime            
        var category = req.params.category;
        requester.$get('/billing/v2/list/' + category).
            then((data) => {
                console.log(data)
                res.send(data);
            }, (error) => {
                console.log(error); res.send(error);
            }
            );
    });
    //Pay for billers that are in a category say airtime            
    api.post('/pay/bills', function (req, res) { // this was for testing remember to remove it
        var headers = {}
        var forpaystring = bill.paybill(req.body);

        requester.$http(forpaystring, '/ipay-billing/sandbox/create', 'apis.ipayafrica.com', headers).
            then((success) => {
                res.send(success)
            }).catch((error) => {
                res.send(error);
            })

    });
    api.post('/pay/:category', function (req, res) {
        var formdata = req.body;
        var category = req.params.category;
        var hashid = bill.paybill(formdata);
        requester.paylist(category, formdata, hashid, function (data, status) {
            res.status(status).send(data);
            console.log(data);
        });
    });
    api.post('/ipay', function (req, res) {//this rout returns the payment interface of ipay...
        var formdata = JSON.stringify(req.body);
        var url = 'https://payments.ipayafrica.com/v3/ke?';
        var config = (req.hostname == 'localhost')? db.configs.local : db.configs.online;
        var con = db.connection(config);
        return db.insertquery(con, JSON.parse(formdata)).then(function (id) {  //take note from here we will reuse for reload of page on fail
            var host = req.headers.referer,
                ipaystring = bill.webpay(JSON.parse(formdata), id, host),
                querystr = querystring.stringify(ipaystring);
            console.log(querystr);
            return res.redirect(url + querystr);
        }).catch(function (error) {
            console.log(error)
            var exists = fs.readFileSync(`billing/error.html`)
            var file = exists.toString('utf-8'),
            err = { 'error': { name: 'A Database Error', text: err.message } };
            var tpl = handlebars.compile(file)(err);
            res.set({
                //'ETag': hash,
                'Cache-Control': 'public, no-cache'
            });
            res.send(tpl);
        });
    });
    api.get('/ipn', function (req, res) {
        var getvars = req.query,
            url,
            success,
            headers = {},
            paymentstatus,
            configs = (req.hostname == 'localhost')? db.configs.local : db.configs.online,
            ipnstring = {
                vendor: bill.vendor_id,
                id: getvars.id,
                ivm: getvars.ivm,
                qwh: getvars.qwh,
                afd: getvars.afd,
                poi: getvars.poi,
                uyt: getvars.uyt,
                ifd: getvars.ifd
            }
    
        console.log(querystring.stringify(ipnstring));
        // configs.debug = true;
        var con = db.connection(configs)
        requester._get('https://www.ipayafrica.com/ipn/?' + querystring.stringify(ipnstring)).
            then(function (success) {
                if (success !== undefined) {
                    console.log("ipn response: " + success)
                    paymentstatus = bill.ipn(success) //returns true or 'status like less, failed, used if not successful'
                    console.log(paymentstatus);

                    var formdata = { paid_status: paymentstatus };

                    return db.updatequery(con, formdata, 'billing_online', ipnstring.id);
                } else {
                    throw { error: { 'name': '404', 'text': "Ipay did not return a response, try again" } }; console.log('failed after the check')
                }//end of the  if
            }).
            then(function (updated) {
                console.log(updated)
                if (paymentstatus == true && updated > 0) { //if true trigger a call to the billing API
                    // if(updated > 0){ //if true trigger for test call to the billing API
                    var paystring = {};
                    paystring.biller_name = getvars.p1;//eg. safaricom, gotv etc...
                    paystring.account = getvars.p2; //account bieng cre4dited  
                    paystring.phone = getvars.msisdn_idnum; //Phone number
                    paystring.amount = getvars.mc; //value of the credit amount 
                    paystring.vid = bill.vendor_id; //ipaybilling
                    var forpaystring = bill.paybill(paystring);
                    // '/ipay-billing/create' original
                    console.log(paystring);
                    console.log(forpaystring);
                    return requester.$http(forpaystring, '/ipay-billing/create', 'apis.ipayafrica.com', headers)
                    // return requester.$http(forpaystring,'/ipay-billing/sandbox/create', 'apis.ipayafrica.com', headers)                

                } else if (paymentstatus !== true) { //Else lenga story and display the transaction failed
                    console.log(paymentstatus + " ->payment status")

                    throw { error: { 'name': paymentstatus, 'text': "The transaction payment status is " + paymentstatus + " Therefore the account for " + getvars.p1 + " has not been credited " } };
                }//end of the if                                                      
            }).then(function (successful) {//returned promise from requeter.$http()
                console.log(successful + " ->billing API Response status")
                success = successful.msg;
                var formupdate = { status_message: JSON.stringify(successful.msg) };
                return db.updatequery(con, formupdate, 'billing_online', ipnstring.id);
            }).then(function (updated) {
                if (updated > 0) {
                    var base64 = new Buffer(JSON.stringify(success)).toString('base64');
                    
                    res.redirect('/?fl=' + ipnstring.id + "&su=" + base64);
                } else {
                    throw { error: { 'name': '404', 'text': "Could Not Update the Transaction status" } };
                }
            }).catch(function (error) {//catch all any possible errors
                var formupdate = { status_message: error.error.text };
                console.log(formupdate)
                db.updatequery(con, formupdate, 'billing_online', ipnstring.id);
                db.connectionend(con);
                var base64 = new Buffer(JSON.stringify(formupdate)).toString('base64');
                res.redirect('/?fl=' + ipnstring.id + '&e=' + base64)
                    // res.send(showtpl('callback', success, 200));
                
            });
    });
    //redirects to home/
    //shows the error
    //allows for navigation
    
    //export the api class/prototype to be used by express to route   
    return api;
};