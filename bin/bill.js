var crypto = require('crypto');
var requester = require('./requester.js');
var hash = require('./hash.js');
var querystring = require('querystring');

module.exports ={
    paybill: function(data){
        var datastring = data.account+data.amount+data.biller_name+data.phone+data.vid;
        querystring.stringify(datastring);
        var key = 'demo';      
        data.hash = hash.hash_hmac(datastring, 'sha256', key);
        return data;         
    },
    hash_hmac: function (data, algo) {
       const hmac = crypto.createHmac(algo, 'SECKEY');
       hmac.update(data);
       return hmac.digest('hex');
    },
    restpay: function(data, id){
      var start = new Date().getTime();
     //assign other parameters that iPay needs to the data object in this manner
    //  console.log(id);
      data.live = '0';
      data.oid = id;                                             
      data.inv = id+data.account; 
      data.vid = 'demo';
      data.curr = 'KES';
      data.p1 = data.biller;
      data.p2 = data.account;
      data.p3 = data.category;
      data.p4 = data.amount;
      data.cbk = 'localhost:3000/';
      data.cst = '1';
      data.crl = '0';
      var hash = require('./hash.js'); //generate hash
      delete data.account;
      var key = 'demo';
                 //    data.live+data.oid+data.inv+data.amount+data.tel+data.eml+data.vid+data.curr+data.p1+data.p2+data.p3+data.p4+data.cst+data.cbk;  
      var datastring = data.live+data.oid+data.inv+data.amount+data.tel+data.eml+data.vid+data.curr+data.p1+data.p2+data.p3+data.p4+data.cst+data.cbk;
      var hashid = hash.hash_hmac(datastring, 'sha256', key);
      data.hash = hashid;
      return data;
    },
    ipaymobile: function(data){
       //generate hash
      var key = 'demo'
      var datastring = data.sid+data.vid;
      var hashid = hash.hash_hmac(datastring, 'sha256', key);
      data.hash = hashid;
      return data;
    },
    ipaycard: function(data, biller){
      var key = 'demo'
      var datastring = data.sid+data.vid+data.cardno+data.cvv+data.month+data.year+data.cust_address+data.cust_city+data.cust_country+data.cust_postcode+data.cust_stateprov+data.fname+data.lname;
      var hashid = hash.hash_hmac(datastring, 'sha256', key);
      data.hash = hashid;
      return data;
    },
    pusher: function () {
        var Pusher = require('pusher');

        var pusher = new Pusher({
        appId: '289805',
        key: '7f15e1e5c14e3e3db3fd',
        secret: '9d674ec9b59acc274a6a',
        encrypted: true
        });

        pusher.trigger('my-channel', 'my-event', {
        "message": "hello world"
        });
    }
};