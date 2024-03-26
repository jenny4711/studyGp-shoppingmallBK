const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const discountSchema = Schema(
  {
    code:{
      type:String,
      required:true,
      unique:true,
    },
    amount:{
      type:Number,
      required:true,

    },
    validFrom:{
      type:Date,
      require:true,

    },
    validTo:{
      type:Date,
      require:true,
    },
  },
  {timeStamps:true}
);
discountSchema.methods.toJSON = function (){
  const obj = this.toObject();
delete obj.__v;
delete obj.updateAt;
delete obj.createAt;
return obj;
};

const Discount = mongoose.model("Discount",discountSchema);
module.exports = Discount