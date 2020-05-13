
var express = require('express');
var mongoose = require('mongoose');
var faker = require('faker');
var path = require('path');
var fakerModel = require('./model/candidat');
mongoose.connect('mongodb://localhost:27017/fakedata',{useNewUrlParser:true})
.then(()=>console.log('connected to db')).catch(error=>console.log('connection error',error));

var app = express();
var diploms;
//
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));

app.get('/',(req,res)=>{
    fakerModel.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data){
            res.render('home',{data:data});
        }
        else{
            res.render('home',{data:{}});
        }
    });
});

app.post('/',(req,res)=>{
    for(var i=0;i<10;i++){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("fakedata");
          
            dbo.collection("Diploms").find({}).toArray(function(err, diploms) {
              if (err) throw err;
              console.log(diploms[Math.floor(Math.random()*7126)].Label);
              var fakee = new fakerModel({
                firstname:faker.name.firstName(),
                lastname:faker.name.lastName(),
                phonenumber:faker.phone.phoneNumber(),
                city:faker.address.city(),
                country:faker.address.country(),
                diplom:diploms[Math.floor(Math.random()*7126)].Label
            });
            fakee.save((err,data)=>{
                if(err){
                    console.log(err)
                }
            });
              db.close();
            });
          });
       
    }
    res.redirect('/');
});

var port = process.env.PORT || 3000 ;

app.listen(port,()=>console.log('server running at port '+port));