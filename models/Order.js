const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User")
const Cart = require("./Cart")
const Product = require("./Product")
const orderSchema = Schema(
  {
    userId:{type:mongoose.ObjectId,ref:User},
    status:{type:String,default:'preparing'},
    totalPrice:{type:Number,required:true},
    discountPrice:{type:Number},
    shipTo:{type:Object,required:true},
    contact:{type:Object,required:true},
    orderNum:{type:String},
    items:[{
      productId:{type:mongoose.ObjectId,ref:Product},
      size:{type:String,required:true},
      qty:{type:Number,required:true,default:1},
      price:{type:Number,required:true}
    }]
    
   
  },
  { timestamps: true }
);

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};
orderSchema.post("save",async function (){
  // make empty cart
  const cart = await Cart.findOne({userId:this.userId})
  cart.items=[];
  await cart.save();
})

const Order= mongoose.model("Order", orderSchema);
module.exports = Order;
