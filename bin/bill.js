var requester = require('./requester.js');
var hash = require('./hash.js');
var querystring = require('querystring');
const VENDOR_ID = 'APP_ID';
const HASH_KEY = 'APP_KEY';

module.exports ={
    vendor_id:VENDOR_ID,//exporting the vendor Id also
    paybill: function(data){
        
        var datastring = {};
        /*Object keys to get an Array for the keys then we sort and iterate the datastring object
        * with the map function and put values in the sorted order */ 
        Object.keys(data).sort().map((k) =>{
            datastring[k] = data[k]; 
        });
        var key = HASH_KEY;    
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
    }
};
