const  mongoose  = require("mongoose");
require('mongoose-type-email');
const Schema = mongoose.Schema;

const emailSchema =  new Schema({
  email:{
    userName:String,
    email:String,
  },
})

module.exports = email.Schema;