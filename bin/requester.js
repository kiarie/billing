var http = require('https');
var querystring = require('querystring');
var options = function(routepath){
    return {
        host:'api.ipayafrica.com',
        path:routepath,
        headers: {
        'authorization': 'Bearer SOME_KEY'
        }
    };
};
var post_options = function(routepath, postData){
    return {
        method: 'post',
        host:'api.ipayafrica.com',
        path:routepath,
        headers: {
        'authorization': 'Bearer SOME_KEY',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
        }
    };
};
var post_option = function(routepath, headerz, host, methods){
//    headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // headers['Content-Length']= Buffer.byteLength(formData);
    return {
        method: methods,
        host:host,
        path:routepath,
        headers: headerz
    };
};
module.exports = {
    lists: function(callback) {
        //this is the request that fetches the list of billing categories
        var req = http.get(options('/billing/v2/list'), function(res) {
            var str ='';
            res.on('data', function (chunk){
                str += chunk;                        
            });
            res.on('end', function(){
                //    console.log(res.statusCode, str);
                   callback(JSON.parse(str), res.statusCode);//the callback function to return data
            });
        });
        req.on('error', function(e){
            console.log('Problem with request: ${e.message}'+e.message);
            callback(JSON.parse(JSON.stringify({error: e.message})), 500);
        });
        req.end();
    },
    clist: function(category, callback) {
        var req = http.get(options('/billing/v2/list/'+category), function(res) {
            var str ='';
            res.on('data', function (chunk){
                str += chunk;                        
            });
            res.on('end', function(){
                   console.log(res.statusCode, str);
                   callback(JSON.parse(str), res.statusCode);
            });
        });
        req.on('error', function(e){
            console.log('Problem with request: ${e.message}'+e.message);
                        callback(JSON.parse(JSON.stringify({error: e.message})), 500);
        });
        req.end();
    },
    paylist:function(category, formData, hash, callback){
        var postd = querystring.stringify({
            
            'amount':formData.amount,
            'biller_name':formData.biller,
            'phone':formData.phone,
            'account':formData.account,
            'vid':formData.vid,
            'hash' : hash
        });
        var req = http.request(post_options('/billing/v2/pay/'+category, postd), function (res) {
            var str = '';
            res.on('data', function(chunk){
                str+=chunk;
                console.log('recieving');
            });
            res.on('end', function(){
                   console.log(res.statusCode, str);
                   callback(JSON.parse(str), res.statusCode);
            });
          });
         req.on('error', function(e){
             callback(JSON.parse(JSON.stringify({error:e.message})), 500);
         });
         req.write(postd);
         req.end();
    },
    ipayrest:function(formData, url,  callback){
        var parsees = querystring.stringify(formData);
        var req = http.request(post_options(url, parsees), function (res) {
            var str = '';
            res.on('data', function(chunk){
                str+=chunk;
                console.log('recieving');
            });
            res.on('end', function(){
                   console.log(res.statusCode, str);
                   callback(JSON.parse(str), res.statusCode);
            });
          });
         req.on('error', function(e){
             callback(JSON.parse(JSON.stringify({error:e.message})), 500);
         });
         req.write(parsees);
         req.end();

    },
    ipayresttest:function(formData, url){
        var parsees = querystring.stringify(formData);
        return new Promise(function (resolve, reject) {
            var req = http.request(post_options(url, parsees), function (res) {
            var str = '';
            res.on('data', function(chunk){
                str+=chunk;
                console.log('recieving');
            });
            res.on('end', function(){
                if(res.statusCode === 200){
                   resolve(JSON.parse(str));
                }
                console.log(res.statusCode)
                reject(JSON.parse(str));
            });
          });
         req.on('error', function(e){
             reject(JSON.parse(JSON.stringify({error:e.message})));
         });
         req.write(parsees);
         req.end(); 
        })
       

    },
     $http:function(fdata, url, host, headers){
        var formdata = querystring.stringify(fdata);
        headers['authorization']= 'Bearer SOME_KEY';
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        headers['Content-Length']= Buffer.byteLength(formdata);
        return new Promise(function (resolve, reject) {
            var req = http.request(post_option(url, headers, host, 'post'), function (res) {
            var str = '';
            res.on('data', function(chunk){
                str+=chunk;
                console.log('recieving response from post');
                //  console.log(host+url)
                 
            });
            res.on('end', function(){
                if(res.statusCode === 200){
                   resolve(JSON.parse(str));
                }
                reject(JSON.parse(str));
                   console.log(str);
                
            });
          });
         req.on('error', function(e){
             reject(JSON.parse(JSON.stringify({error:e.message})));
         });
         req.write(formdata);
         console.log(formdata);        
         req.end(); 
        })
       

    },
    $get:function(url){
        return new Promise(function (resolve, reject) {
            var req = http.get(options(url), function (res) {
            var str = '';
            res.on('data', function(chunk){
                str+=chunk;
                console.log('recieving');
                //  console.log(str)
            });
            res.on('end', function(){
                if(res.statusCode === 200){
                   resolve(JSON.parse(str));
                }
                reject(JSON.parse(str));
            });
          });
         req.on('error', function(e){             
             reject(JSON.parse(JSON.stringify({error:e.message})));
         });
         req.end(); 
        });
    },
        _get:function(url){
        return new Promise(function (resolve, reject) {
            var req = http.get(options(url), function (res) {
            var str = '';
            res.on('data', function(chunk){
                str+=chunk;
                console.log('recieving');
                 console.log(str)
            });
            res.on('end', function(){
                if(res.statusCode === 200){
                   resolve(str);
                }
                reject(str);
            });
          });
         req.on('error', function(e){             
             reject(e.message);
         });
         req.end(); 
        });
    }
    
    
    
    
};
