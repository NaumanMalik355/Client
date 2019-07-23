const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require('bcrypt')

const profileModel = new Schema({
Profile: {
    type: String
},
Gnder: {
    type: String
},
Name: {
    type: String
},
DOB: {
    type: String
},
Email: {
    type:String
},
Address: {
    type:String
},
Age: {
    type: Number
},
City: {
    type:String
},
State: {
    type:String
},
Pincode: {
    type: Number
},
Occupation: {
    type:String
},
Mobile: {
    type:Number
},
DndStatus: {
    type:String
},
Msc: {
    type:String
},

});

module.exports = mongoose.model("profileModel", profileModel);
