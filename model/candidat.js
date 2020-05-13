var  mongoose = require('mongoose');
 var schema= new mongoose.Schema(
     {
         
         firstname: String,
         lastname: String,
         phonenumber: String, 
         city: String,
         country:String,
         diplom:String,
         drivinglicences:String,
         habilitations:String,
         languages:String,
         skills:String,
         qualifications:String


     }
 );
 module.exports = mongoose.model('fakerCollection', schema);