"use strict";

var pg = require('pg');
var connectionString = "postgres://ubuntu:icstars@localhost:5432";

module.exports = function() {
  return {
    executeQuery: function(query, callback){
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          return console.log('[ERROR] Issue connecting to database. Investigate backend/tools/database');
        }
        client.query(query, function(err, result) {
          //call `done()` to release the client back to the pool
          done();

          if(err) {
            return console.log('[ERROR] rSomething went wrong running the query. Investigate backend/tools/database');
          }

          if(callback){
            callback(result.rows);
          }
          return;
        });
      });
    }
  }
}();
