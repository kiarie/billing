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
            requester.$get('/billing/v2/list/'+category).
            then((data)=>{
              console.log(data)
              res.send(data);
               }, (error) =>{
                   console.log(error);res.send(error);
               } 
            );
        });
        //Pay for billers that are in a category say airtime            
        api.post('/pay/bills', function (req,res) { // this was for testing remember to remove it
            var headers = {}
            var forpaystring  = bill.paybill(req.body);  
                       
           requester.$http(forpaystring,'/ipay-billing/sandbox/create', 'apis.ipayafrica.com', headers).
           then((success) => {
               res.send(success)
           }).catch((error)=>{
               res.send(error);
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
        api.post('/ipay', function(req, res){//this rout returns the payment interface of ipay...
                var formdata = JSON.stringify(req.body);
                var url = 'https://payments.ipayafrica.com/v3/ke?';
                var file;
                fs.readFile(`../html/billing/pay.html`).then(function(exists)
                {
                    file = exists.toString('utf-8');
                    return file;
                }).then(function(file) { //insert into db first
                    var con = db.connection(db.configs); 
                    return db.insertquery(con,JSON.parse(formdata));
                },function (err) {
                    throw {'error':{name:'A Database Error',text:err.message}};
                }).then(function(id){  //take note from here we will reuse for reload of page on fail
                    var ipaystring = bill.webpay(JSON.parse(formdata),id); 
                    var querystr = querystring.stringify(ipaystring)                    
                    console.log(querystr);                                  
                    return res.redirect(url+querystr);

                }).catch(function(error) {
                    console.log(error)
                    var exists = fs.readFile(`../html/billing/error.html`)
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(error);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                });
         });
         api.get('/ipn', function(req, res){
            var getvars = req.query, url = '';
            var ipnstring = {
            vendor: getvars.vendor,
            id: getvars.id,
            ivm: getvars.ivm,
            qwh: getvars.qwh,
            afd: getvars.afd,
            poi: getvars.poi,
            uyt: getvars.uyt,
            ifd: getvars.ifd
        }
            requester._get('https://www.ipayafrica.com/ipn/'+querystring.stringify(ipnstring)).
            then(function(success)
             {
                 if(success !== undefined){
                        paymentstatus = bill.ipn(success) //returns true or 'status like less, failed, used if not successful'
                        console.log(paymentstatus+"payment status")
                    if(paymentstatus == true){ //if true trigger a call to the billing API
                        console.log(paymentstatus+"payment status")
                        var paystring ={};
                        paystring.biller_name = data.p1;
                        paystring.account =  data.p2;
                        paystring.phone = data.msisdn_id;
                        paystring.amount = data.p4 ;
                        paystring.vid = 'demo'
                        var forpaystring  = bill.paybill(paystring);
                        return requester.$http(forpaystring,'/ipay-billing/create', 'apis.ipayafrica.com', headers)                
                            
                    }else if(paymentstatus !== true){ //Else lenga story and display the transaction failed
                        console.log(paymentstatus+"payment status")
                           
                      throw {error:{'name':paymentstatus,'text':"The transaction is "+paymentstatus+" Therefore the account has not been credited"}};                                                                         
                    }//end of the nested if
                    }else{
                      throw {error:{'name':'404','text':"Ipay did not return a response, try again"}};                         
                    }//end of the outer if
                                                        
                }).then(function (success) {//returned promise from requeter.$http()
                    success =  success.msg;
                     return fs.readFile(`../html/billing/complete.html`)
                }).then(function(exists){
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(success);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                }).catch(function(error) {//catch all any possible errors
                   fs.readFile(`../html/billing/error.html`).then(function(exists){
                       var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(error);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                   });                 
                });
         });
        // api.post('/ipay', function(req, res){//this rout returns the payment interface of ipay...
        //         var formdata = JSON.stringify(req.body);
        //         var url = '/payments/v2/transact';
        //         var file;
        //         fs.readFile(`../html/billing/pay.html`).then(function(exists)
        //         {
        //             file = exists.toString('utf-8');
        //             return file;
        //         }).then(function(file) { //insert into db first
        //             var con = db.connection(db.configs); 
        //             return db.insertquery(con,JSON.parse(formdata));
        //         },function (err) {
        //             throw {'error':{name:'A Database Error',text:err.message}};
        //         }).then(function(id){  //take note from here we will reuse for reload of page on fail
        //             var ipaystring = bill.restpay(JSON.parse(formdata),id);                     
        //             console.log(ipaystring)                                           
        //             return requester.ipayresttest(ipaystring,url)
        //         }).then(function (data) {
        //             if(data.data !== undefined){
        //                 data.data.biller = formdata.p1;
        //                 console.log(data)
        //                 return handlebars.compile(file)(data.data);                        
        //                 }                                  
        //               throw {error:{name:'404', text:"Not Found any data"}};                        
        //         }).then(function(tpl) {
        //             res.set({
        //           //'ETag': hash,
        //             'Cache-Control': 'public, no-cache'
        //                 });
        //             res.send(tpl);
                    
        //         }).catch(function(error) {
        //             console.log(error)
        //             var exists = fs.readFile(`../html/billing/error.html`)
        //             var file = exists.toString('utf-8');
        //             var tpl  = handlebars.compile(file)(error);
        //             res.set({
        //             //'ETag': hash,
        //             'Cache-Control': 'public, no-cache'
        //                 });
        //             res.send(tpl);
        //         });
        //  });
         api.post('/ipay/mobile', function(req, res){//transact call for mobile rest integration
                var formdata = req.body;
                var url = '/payments/v2/transact/mobilemoney', success;
                var ipaystring = bill.ipaymobile(formdata), headers = {}, paymentstatus;
                requester.ipayresttest(ipaystring,url).then(function (data) {
                  if(data.status !== undefined){
                        paymentstatus = bill.ipn(data.status) //returns true or 'status like less, failed, used if not successful'
                        console.log(paymentstatus+"payment status")
                    if(paymentstatus == true){ //if true trigger a call to the billing API
                        console.log(paymentstatus+"payment status")
                        var paystring ={};
                        paystring.biller_name = data.p1;
                        paystring.account =  data.p2;
                        paystring.phone = data.msisdn_id;
                        paystring.amount = data.p4 ;
                        paystring.vid = 'demo'
                        var forpaystring  = bill.paybill(paystring);
                        return requester.$http(forpaystring,'/ipay-billing/create', 'apis.ipayafrica.com', headers)                
                            
                    }else if(paymentstatus !== true){ //Else lenga story and display the transaction failed
                        console.log(paymentstatus+"payment status")
                           
                      throw {error:{'name':paymentstatus,'text':"The transaction is "+paymentstatus+" Therefore the account has not been credited"}};                                                                         
                    }//end of the nested if
                    }else{
                      throw {error:{'name':'404','text':"Ipay did not return a response, try again"}};                         
                    }//end of the outer if
                                                        
                }).then(function (success) {//returned promise from requeter.$http()
                    success =  success.msg;
                     return fs.readFile(`../html/billing/complete.html`)
                }).then(function(exists){
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(success);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                }).catch(function(error) {//catch all any possible errors
                   fs.readFile(`../html/billing/error.html`).then(function(exists){
                       var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(error);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                   })
                    
                
                });
            });
         api.post('/ipay/card', function(req, res){
                var formdata = req.body;
                var url = '/payments/v2/transact/cc', paymentstatus;
                var ipaystring = bill.ipaycard(formdata), headers = {}, success;
                requester.ipayresttest(ipaystring, url).then(function(data){
                    console.log(data);
                    if(data.status !== undefined){
                        paymentstatus = bill.ipn(data.status) //returns true or 'status like less, failed, used if not successful'
                        console.log(paymentstatus+"payment status")
                    if(paymentstatus == true){ //if true trigger a call to the billing API
                        console.log(paymentstatus+"payment status")
                         var paystring ={};
                        paystring.biller_name = data.p1;
                        paystring.account =  data.p2;
                        paystring.phone = data.msisdn_idnum;
                        paystring.amount = data.mc;
                        paystring.vid = 'demo'
                        var forpaystring  = bill.paybill(paystring);
                        console.log(forpaystring);
                        return requester.$http(forpaystring,'/ipay-billing/sandbox/create', 'apis.ipayafrica.com', headers)                 
                         
                    }else if(paymentstatus !== true){ //Else lenga story and display the transaction failed
                        console.log(paymentstatus+"payment status")
                           
                      throw {error:{'name':paymentstatus,'text':"The transaction is "+paymentstatus+" Therefore the account has not been credited"}};                                                                         
                    }//end of the nested if
                    }else{
                      throw {error:{'name':'404','text':"Ipay did not return a response, try again"}};                         
                    }//end of the outer if
                                                        
                }).then(function (sucessdata) {//returned promise from requester.$http()
                    success =  sucessdata.msg;
                    console.log("success Line 184:"+success)
                     return fs.readFile(`../html/billing/complete.html`)
                }).then(function(exists){
                    var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(success);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                }).catch(function(error) {//catch all any possible errors
                   fs.readFile(`../html/billing/error.html`).then(function(exists){
                       var file = exists.toString('utf-8');
                    var tpl  = handlebars.compile(file)(error);
                    res.set({
                    //'ETag': hash,
                    'Cache-Control': 'public, no-cache'
                        });
                    res.send(tpl);
                   })
                    
                
                });
                 // res.status(200).send(ipaystring);
         });
    //export the api class/prototype to be used by express to route   
    return api;
};