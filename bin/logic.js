const mysql = require('mysql');
// const fs = require('mz/fs');

module.exports = {
    configs:{
        online:{
            host:"46.101.121.39",
            user:"ipay",
            password: "aun64UY2wJCySTn5",
            database : 'online_billing'
              },
        local:{
             host:"localhost",
             user:"root",
             password: "admin",
             database : 'online_billing'
             }
       
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

            // console.log(result.insertId);git diff
            
            
            resolve(result.insertId);
            connection.end()
            });  
        });
        
    },
    selectquery:function(connection, fields, table, whereID) {
        return new Promise(function(resolve, reject){
            connection.query('SELECT ?? FROM ?? WHERE id LIKE id = ?',[fields, table, whereID], function(err, result){
                if(err) reject(err);
              
                resolve(result)
                connection.end();
            })
        })
    },
    updatequery:function(connection, fields, table, Id){
         return new Promise(function(resolve, reject){
             connection.query('UPDATE '+table+' SET ? WHERE id=' + connection.escape(Id), fields, function(err, result){
                if(err){
                    console.log(err);
                    reject(err);
                }
                //  console.log(result)
                resolve(result.affectedRows);
               
                // connection.end();                
             });
         });
    },
    connectionend:function (connection) {
        connection.end();        
    }
    
 };
 //+ mysql.escape("Hello MySQL") use to escape strings