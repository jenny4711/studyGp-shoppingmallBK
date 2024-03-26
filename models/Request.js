const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User")
const Product = require("./Product")
const requestSchema = Schema(
  {
    userId:{type:mongoose.ObjectId, ref:User},
    productId:{type:mongoose.ObjectId,ref:Product},
    size:{type:String,require:true},
    qty:{type:String,require:true,default:1},
    confirmed:{type:Boolean,default:false}
  },
  {timestamps:true}
);
requestSchema.methods.toJSON = function (){
  const obj = this._doc;
  delete obj.__v;
  delete obj.createAt;
  return obj;
}
const Request = mongoose.model("Request",requestSchema);
module.exports = Request;