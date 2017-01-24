var express = require('express');
var app = express();
var router = require('./bin/api');
const fs = require('mz/fs');
const handlebars = require('handlebars');
var requester = require('./bin/requester');


// apply the routes to our application



const templateUrl = /([^/]*)(\/|\/index.html)$/;
app.get('/partial/:name', function(req, res) {
  var partial = req.params.name;
  var path = req.path;
  var files; 
  
//   console.log(partial);
  var compare = partial === 'contact' || partial ==='buy' || partial ==='properties' || partial === 'payments';
        
    if(compare) {
    files = [fs.readFile(`../html/billing/${partial}.html`)];
    }else{
        files = [fs.readFile(`../html/billing/home.html`)];
    }
    
  Promise.all(files).
  then(files => files.map(f => f.toString('utf-8'))).
  then(files => {
      const content = files.join('');
       res.set({
  //   'ETag': hash,
      'Cache-Control': 'public, no-cache'
    });
    res.send(content);
  })
  .catch(error => res.status(500).send(error.toString()));
    
});
/*

      files = [
          fs.readFile(`../html/billing/${path}.html`),
          fs.readFile(`../html/billing/${path}.html`),
          fs.readFile(`../html/billing/${path}.html`)
      ];

*/


//////////////////////////////////////////////
app.use('/', require('./bin/api')(express));
app.use(express.static('../html/billing'));
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  var files = [fs.readFile(`../html/billing/error.html`)];
 
    
  Promise.all(files).
  then(files => files.map(f => f.toString('utf-8'))).
  then(files => {
      const content = files.join('');
       res.set({
  //   'ETag': hash,
      'Cache-Control': 'public, no-cache'
    });
    res.send(content);
    next();
  })
  
});
app.listen('3000');
console.log('Server running!');
