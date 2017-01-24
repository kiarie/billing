var bodyparser = require('body-parser');
var querystring = require('querystring');
const fs = require('mz/fs');
var db = require('./logic');
const handlebars = require('handlebars');
module.exports = function(express){
		// home page route (http://localhost:3000)
        //get list of billing categories
        var api = express.Router();
        var requester = require('./requester');
        var bill = require('./bill');
        api.use(bodyparser.json());
        api.use(bodyparser.urlencoded({ extended: true }));
        api.get('/list', function(req, res) {
        requester.lists(function(data, status) {
            if(data.data !== undefined){
               res.status(status).send(data.data);
            }else{ res.status(status).send(data);}
           });        
        });
        // about page route (http://localhost:3000/about)
        api.get('/list/:category', function(req, res) {
        //get list of billers that are in a category say airtime            
            var category = req.params.category;
            // res.send('im the about page!'); 
            requester.clist(category, function(data, status){
                
                res.status(status).send(data.data);
            });
        });
        //Pay for billers that are in a category say airtime            
        api.post('/pay/bills', function (req,res) {
            var formdata  = req.body;
            var paystring  = bill.paybill(formdata);
            var headers = {};
            requester.$http(paystring,'/ipay-billing/sandbox/create', 'apis.ipayafrica.com', headers).
            then(function(success){
                console.log(success);
                res.send(success);
            }, function(rejects) {
                res.send(rejects);
            })
        });
        api.post('/pay/:category', function(req, res){
            var formdata  = req.body;
            var category = req.params.category;
            var hashid  = bill.paybill(formdata);
            requester.paylist(category, formdata, hashid, function(data, status) {
                res.status(status).send(data);
                console.log(data);
             });
        });
        api.post('/ipay/mock', function(req, res) {
            var biller = req.params.biller,formdata = req.body;
            var data = {"header_status": 200,
                        "status": 1,
                        "data": 
                        { "sid": '8e294fa9-273e-4fd5-b142-990169f68439',
                            "oid": formdata.account,
                            "amount": formdata.amount,
                            "account": 'KS34607',
                            "payment_channels": [{
                                "name": "MPESA",
                                "paybill": "510800"
                            },
                            {
                                "name": "AIRTEL",
                                "paybill": "510800"
                            }],
                            "hash": '42dd5f47c32f57757b38b40f61824df2c5d854258a14f639f618d736263d604e',
                            "biller": biller } 
                            }

            fs.readFile(`../html/billing/pay.html`).then(function(exists) {
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(data.data);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                    });
        });
        api.post('/ipay', function(req, res){//this rout returns the payment interface of ipay...
                var formdata = JSON.stringify(req.body);
                var url = '/payments/v2/transact';
                var file;
                fs.readFile(`../html/billing/pay.html`).then(function(exists)
                {
                    file = exists.toString('utf-8');
                    return file;
                }).then(function(file) {
                    var con = db.connection(db.configs); 
                    return db.query(con,JSON.parse(formdata));
                },function (err) {
                    throw {'error':err.message};
                }).then(function(id){  
                    var ipaystring = bill.restpay(JSON.parse(formdata),id);                     
                    console.log(ipaystring)                                           
                    return requester.ipayresttest(ipaystring,url)
                }).then(function (data) {
                    if(data.data !== undefined){
                        data.data.biller = formdata.p1;
                        return handlebars.compile(file)(data.data);                        
                        }                                  
                      throw {error:"hapa kuna shida"};                        
                }).then(function(tpl) {
                    res.set({
                  //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                    
                })
                .catch(function(error) {
                    console.log(error)
                     res.status(500).send(error);
                });
                          
            });
         api.post('/ipay/mobile', function(req, res){//transact call for mobile rest integration
                var formdata = req.body;
                var url = '/payments/v2/transact/mobilemoney';
                var ipaystring = bill.ipaymobile(formdata), headers = {};
                requester.ipayresttest(ipaystring,url).then(function (data) {
                    console.log(data);
                    if(data.status !== undefined){
                        
                        var paystring ={};
                        paystring.biller_name = data.p1;
                        paystring.account =  data.p2;
                        paystring.phone = data.msisdn_id;
                        paystring.amount = data.p4 ;
                        paystring.vid = 'demo'
                        var forpaystring  = bill.paybill(paystring);
                        return requester.$http(forpaystring,'/ipay-billing/create', 'apis.ipayafrica.com', headers)                 
                        }                                  
                      throw {error:"hapa kuna shida"};  //return handlebars.compile(file)(data.data);                        
                   
                }).then(function (success) {
                                
                    fs.readFile(`../html/billing/complete.html`).then(function(exists) {
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(success);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                    });
                },function(error) {
                    res.status(500).send(error)
                })
                // requester.ipayrest(ipaystring, url, function(data, status){
                //     res.status(200).send(data);
                // });
                 // res.status(200).send(ipaystring);
            });
         api.post('/ipay/card', function(req, res){
                var formdata = req.body;
                var url = '/payments/v2/transact/cc';
                var ipaystring = bill.ipaycard(formdata), headers = {};
                requester.ipayresttest(ipaystring, url).then(function(data){
                    console.log(data);
                    if(data.status !== undefined){
                        
                        var paystring ={};
                        paystring.biller_name = data.p1;
                        paystring.account =  data.p2;
                        paystring.phone = data.msisdn_idnum;
                        paystring.amount = data.mc;
                        paystring.vid = 'demo'
                        var forpaystring  = bill.paybill(paystring);
                        console.log(forpaystring);
                        return requester.$http(forpaystring,'/ipay-billing/sandbox/create', 'apis.ipayafrica.com', headers)                 
                        }                                  
                      throw {error:{'name':"hapa kuna shida"}}; 
                }).then(function (success) {
                                
                    fs.readFile(`../html/billing/complete.html`).then(function(exists) {
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(success);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                    });
                },function(error) {
                    
                  fs.readFile(`../html/billing/error.html`).then(function(exists) {
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(error);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                    // res.status(500).send(error)
                })
                });
                 // res.status(200).send(ipaystring);
            });
        api.post('/ipay/:category', function(req, res){
           if(req.body === undefined || req.body.ammount === undefined || req.body.biller === undefined || req.body.currency === undefined)
           {
               res.status(401).send({"header_status": 401, "text":"please ensure your have set the parameters"})
           }else{
           res.status(200).send({
           "header_status":200,
           "status":"1",
           "text":"safaricom payment for Account 2sw22 has succesfully been accepted ",
           "reference":"SAFARICOM1642561826"
          });
           }
         });
        
    return api;
};
/*
 api.post('/ipay', function(req, res){//this rout returns the payment interface of ipay...
                var formdata = JSON.stringify(req.body);
                var url = '/payments/v2/transact';
                var file;
                fs.readFile(`../html/billing/pay.html`).then(function(exists)
                {
                    file = exists.toString('utf-8');
                    return file;
                }).then(function(file) {
                    var con = db.connection(db.configs); 
                    return db.query(con,JSON.parse(formdata));
                },function (err) {
                    throw {'error':err.message};
                }).then(function(id){  
                    var ipaystring = bill.restpay(JSON.parse(formdata),id);                     
                    console.log(ipaystring)                                           
                    return requester.ipayresttest(ipaystring,url)
                }).then(function (data) {
                    if(data.data !== undefined){
                        data.data.biller = formdata.p1;
                        return handlebars.compile(file)(data.data);                        
                        }                                  
                      throw {error:"hapa kuna shida"};                        
                }).then(function(tpl) {
                    res.set({
                  //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
      */