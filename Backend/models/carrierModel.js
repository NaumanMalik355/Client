const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require('bcrypt')

const carrierModel = new Schema({
Number: {
    type: String
},
Carrier: {
    type: String
},
Name: {
    type: String
},
Gender:{
    type:String
},
Image:{
    type:String
},
Address:{
    type:String
},
JobTitle:{
    type:String
},
CompanyName:{
    type:String
},
Email:{
    type:String
},
Website:{
    type:String
},
Facebook:{
    type:String
},
Twitter:{
    type:String
},
Tags:{
    type:String
},
Badges:{
    type:String
},
Score:{
    type:String
},
SpamCount:{
    type:String
},
  
//   dataId: {type: Schema.Types.ObjectId, ref:'LoginAccount'}

});

module.exports = mongoose.model("carrierModel", carrierModel);
