var express = require('express');
var app = express();
var router = require('./bin/api');
const fs = require('mz/fs');
const handlebars = require('handlebars');
var requester = require('./bin/requester'),
    db = require('./bin/logic'),
  port = process.env.PORT || 3000;

/**
 * Registering a Handlebars Custom Helper
 * our own helper to check for equality (or inequality).
 */
handlebars.registerHelper('ifEq', function(a,b,opt){
  if(a === b){
    return opt.fn(this)
  }
  return opt.inverse(this)
})
handlebars.registerHelper('Capitalize', function(opt){
  var word = opt.fn(this).split("")
  word[0] = word[0].toUpperCase();
  if(opt.fn(this) === 'tv') return opt.fn(this).toUpperCase();
  return word.join("")
})
// apply the routes to our application



const templateUrl = /([^/]*)(\/|\/index.html)$/;
app.get('/partial/:name/:specname?', function(req, res) {
  var partial, subcategory = "none",files,f; //initialise three variables at once awesome!! js killed it
  //f->this will be the file, partial->will be the file name, files->is the contents of the file read
  if(!req.params.specname){
    partial = req.params.name;
  }else{
    partial = req.params.specname;    
    subcategory = req.params.name; //e.g. Airtel, safaricom, zuku
  }
  console.log(req.xhr);
  var compare = partial === 'contact' || partial ==='buy' || partial ==='home' || partial === 'payments';
        
    if(compare) {
    files = fs.readFile(`billing/${partial}.html`);
    }else{
        files = fs.readFile(`billing/utils.html`);//the page which lists the billing options for a category
    }
    files.
    then(file => f = file.toString('utf-8')).    
    then(file => {
       return requester.$get('/billing/v2/list/'+partial)
    }).
    then(data => {
    return handlebars.compile(f)({categories : data.data, name : partial, image_url:subcategory})
    }).
    then(tpl => {
        // const content = files.join('');
        res.set({
    //   'ETag': hash,
        'Cache-Control': 'public, no-cache'
        });
        res.send(tpl);
    })
    .catch(error => res.status(500).send(error.toString()));
  }); 
  /**
   * use this eventually to serve? 
   */
  //app.get('/:name?/:specname?', function(req, res) {}); 
//   Promise.all(files).
//   then(files => files.map(f => f.toString('utf-8'))).
//   then(files => {
//       const content = files.join('');
//        res.set({
//   //   'ETag': hash,
//       'Cache-Control': 'public, no-cache'
//     });
//     res.send(content);
//   })
//   .catch(error => res.status(500).send(error.toString()));
    
// });
/*

      files = [
          fs.readFile(`billing/${path}.html`),
          fs.readFile(`../html/billing/${path}.html`),
          fs.readFile(`../html/billing/${path}.html`)
      ];

*/
/**
function ipncallbackHandler(req, res, next)
{
  if('e' in req.query){
    var err_id = req.query.fl;
    req.files = [fs.readFile(`billing/index.html`),
                 fs.readFile(`billing/error.html`)];
   }else{
       req.files = [fs.readFile(`billing/index.html`)];
   }
  return next();
}
function homerouter( req, res, next)
{
    var files = req.files, 
        con = db.connection(db.configs),
        displaydata;
    Promise.all(files).
    then(files => files.map(f => f.toString('utf-8'))).
    then(files => {
          if('fl' in req.query){
           db.selectquery(con,['paid_status', 'status_message'], 'billing_orders', req.query.fl).
           then(function(success){
              displaydata = success;
                console.log(success);
           }).catch(function(err){
             console.log(err)
           });
          }
          return files.map((f)=>handlebars.compile(f)(displaydata))
        }).
    then(files => {
        const content = files.join('');
        res.set({
    //   'ETag': hash,
        'Cache-Control': 'public, no-cache'
      });
      res.send(content);
    })
    .catch(error => {
      console.log(error); res.status(500).send(error.toString())
    });
      
}
*/

//////////////////////////////////////////////
app.use('/', require('./bin/api')(express));
// app.use(ipncallbackHandler, homerouter);
app.use(express.static('billing'));
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  var files = [fs.readFile(`billing/error.html`)];
 
    
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

app.listen(port);
console.log('Server running!');
//$sudo start billing_node_app
