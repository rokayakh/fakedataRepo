
var express = require('express');
var mongoose = require('mongoose');
var faker = require('faker');
var path = require('path');
var fakerModel = require('./model/candidat');
mongoose.connect('mongodb://localhost:27017/fakedata',{useNewUrlParser:true})
.then(()=>console.log('connected to db')).catch(error=>console.log('connection error',error));

var app = express();
var diploms;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("fakedata");
  /*Return only the documents where the address starts with an "S":*/
  var query = { address: /^S/ };
  dbo.collection("Diplom").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
