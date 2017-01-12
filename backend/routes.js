'use strict'

var router = require('express').Router();
var database = require('./c37_modules/database');
var multer  = require('multer');
var upload = multer({ dest: 'frontend/images/' });

module.exports = function() {

  router.get('/', function(req,res){
    return res.render('helloworld.html');
  });

  router.get('/trains', function(req,res){
    return res.render('trains.html');
  });

  router.get('/image', function(req, res){
    return res.render('image_upload.html');
  });

  router.get('/trains/data', function(req,res){
    database.executeQuery("SELECT * FROM trains", function(results) {
      res.send(results);
    });
  });

  router.post('/trains/data', function(req,res){
    database.executeQuery("INSERT INTO trains VALUES...", function(results) {
      res.send(results);
    });
  });

  router.post('/image/upload', upload.single('image'), function (req, res){
    var filename = req.file.filename
    console.log('File was uploaded: ' + filename);
    return res.send("<html><img src='/images/" + filename + "'/></html>")
  }); 

  /* Your code here */

  return router
}();
