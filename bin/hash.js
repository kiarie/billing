var crypto = require('crypto');
//export a function that can compute hmac similar to php hmac function
//in node
module.exports = {
    hash_hmac: function (data, algo, key) {
       const hmac = crypto.createHmac(algo, key);
       hmac.update(data);
       return hmac.digest('hex');
    }
};