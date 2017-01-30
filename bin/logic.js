const mysql = require('mysql');
// const fs = require('mz/fs');

module.exports = {
    configs:{
        host:"localhost",
        user:"root",
        password: "admin",
        database : 'online_billing'
    },
    connection:function (configs) {
     var connection = mysql.createConnection(configs);
        return connection; 
    },
    insertquery:function(connection, fields) {
        var filtered = fields;
        filtered.telephone = filtered.tel;
        filtered.email = filtered.eml;
        delete filtered.eml;
        delete filtered.tel;
        delete filtered.live;
       return new Promise(function(resolve, reject){
          connection.query('INSERT IGNORE INTO billing_orders SET ?', filtered, function(err, result) {
            if (err) reject(err);

            console.log(result.insertId);
            
            resolve(result.insertId);
            connection.end()
            });  
        });
        
    },
    selectquery:function(connection, fields) {
        return new Promise(function(resolve, reject){
            connection.query('SELECT amount, telephone as tel, account, biller,category, email as eml WHERE id LIKE = ?',[fields], function(err, result){
                if(err) reject(err);
                
                resolve(result)
                connection.end();
            })
        })
    },
    connectionend:function (connection) {
        connection.end();        
    }
    
 };
 //+ mysql.escape("Hello MySQL") use to escape strings