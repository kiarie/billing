var requester = require('./requester.js');
var hash = require('./hash.js');
var querystring = require('querystring');
const VENDOR_ID = 'ipaybilling';
const HASH_KEY = '&*etrs#21)o!';//&*etrs#21)o!
module.exports ={
    vendor_id:VENDOR_ID,//exporting the vendor Id also
    paybill: function(data){
        
        var datastring = {};
        /*Object keys to get an Array for the keys then we sort and iterate the datastring object
        * with the map function and put values in the sorted order */ 
        Object.keys(data).sort().map((k) =>{
            datastring[k] = data[k]; 
        });
        var key = '&*etrs#21)o!';//&*etrs#21)o!      
        data.hash = hash.hash_hmac(querystring.stringify(datastring), 'sha256', key);
        return data;         
    },
    webpay: function(data, id, host){
         var qrstring = {
            live :'1',
            oid :id,
            inv :id+data.account,
            ttl :data.amount,
            tel :data.tel,
            eml :data.eml,
            vid :VENDOR_ID,
            curr :'KES',
            p1 :data.biller,
            p2 :data.account,
            p3 :data.category,
            p4 :data.amount,
            cbk :host+'ipn',
            cst :'1',
            crl :'0' }
      var hash = require('./hash.js'); //generate hash
      var key = HASH_KEY;
      var datastring = qrstring.live+qrstring.oid+qrstring.inv+qrstring.ttl+qrstring.tel+qrstring.eml+qrstring.vid+qrstring.curr+qrstring.p1+qrstring.p2+qrstring.p3+qrstring.p4+qrstring.cbk+qrstring.cst+qrstring.crl;
    //   var datastring = qrstring.live+qrstring.oid+qrstring.inv+qrstring.ttl+qrstring.tel+qrstring.eml+qrstring.vid+qrstring.curr+qrstring.p1+qrstring.p2+qrstring.p3+qrstring.p4+qrstring.cst+qrstring.cbk;
      var hashid = hash.hash_hmac(datastring, 'sha1', key);
      qrstring.hsh = hashid;
      return qrstring;
    },
    restpay: function(data, id){
      var start = new Date().getTime();
     //assign other parameters that iPay needs to the data object in this manner
    //  console.log(id);
      data.live = '1';
      data.oid = id;                                             
      data.inv = id+data.account; 
      data.vid = VENDOR_ID;
      data.curr = 'KES';
      data.p1 = data.biller;
      data.p2 = data.account;
      data.p3 = data.category;
      data.p4 = data.amount;
      data.cbk = 'localhost:3000/';
      data.cst = '1';
      data.crl = '2';
      var hash = require('./hash.js'); //generate hash
      delete data.account;
      delete data.category;
      delete data.biller;
      var key = HASH_KEY;
                 //    data.live+data.oid+data.inv+data.amount+data.tel+data.eml+data.vid+data.curr+data.p1+data.p2+data.p3+data.p4+data.cst+data.cbk;  
      var datastring = data.live+data.oid+data.inv+data.amount+data.tel+data.eml+data.vid+data.curr+data.p1+data.p2+data.p3+data.p4+data.cst+data.cbk;
      var hashid = hash.hash_hmac(datastring, 'sha256', key);
      data.hash = hashid;
      return data;
    },
    ipaymobile: function(data){
       //generate hash
      var key = HASH_KEY;
      var datastring = data.sid+data.vid;
      var hashid = hash.hash_hmac(datastring, 'sha256', key);
      data.hash = hashid;
      return data;
    },
    ipaycard: function(data, biller){
      var key = HASH_KEY;
      var datastring = data.sid+data.vid+data.cardno+data.cvv+data.month+data.year+data.cust_address+data.cust_city+data.cust_country+data.cust_postcode+data.cust_stateprov+data.fname+data.lname;
      var hashid = hash.hash_hmac(datastring, 'sha256', key);
      data.hash = hashid;
      return data;
    },
    ipn:function (status) {
        var stat;
            switch (status) {
                case 'aei7p7yrx4ae34'://successfull
                    stat = true
                    break;
                case 'bdi6p2yy76etrs'://pending
                    stat = 'pending'; //for now make true
                    break;
                case 'fe2707etr5s4wq'://failed
                    stat = 'failed';
                    break;
                case 'eq3i7p5yt7645e'://more
                    stat = true;
                    break;
                case 'dtfi4p7yty45wq'://less
                    stat = 'less';
                    break;
                case 'cr5i3pgy9867e1'://used
                    stat = 'used';
                    break;
                default:
                    stat = false;
                    break;
            }
            return stat;
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
