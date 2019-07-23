const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require('bcrypt')

const fetchData = new Schema({
Number: {
    type: String
  },
Operator: {
    type: String
  },
Name: {
      type: String
  },
City:{
      type:String
  },
Email:{
      type:String
  },
Category:{
      type:String
  }

  
//   dataId: {type: Schema.Types.ObjectId, ref:'LoginAccount'}

});

module.exports = mongoose.model("fetchData", fetchData);
