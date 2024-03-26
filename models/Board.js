const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const boardSchema=Schema(
  {
    title:{type:String,require:true},
    img:{type:String,require:true},
    visible:{type:Boolean,default:false}
  },
  {timestamps:true}
);
boardSchema.methods.toJSON = function (){
  const obj = this._doc;
  delete obj.createAt;
  delete obj.__v;
  return obj;

}

const Board = mongoose.model("Board",boardSchema);
module.exports = Board