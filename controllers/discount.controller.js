const Discount = require("../models/Discount")
const discountController = {};

discountController.createCode = async (req,res)=>{
  try{
    const {
      code,
      amount,
      validFrom,
      validTo,
    } = req.body
    const discount = new Discount({
      code,
      amount,
      validFrom,
      validTo,
    });
    await discount.save();
    res.status(200).json({status:"createCode-success",discount})
  }catch(error){
    res.status(400).json({status:"createCode-fail"});
  }
}

discountController.showCodeAll = async (req,res)=>{
  try{
const showAll = await Discount.find({});
if(!showAll){
  return res.status(404).json({status:"not Found!",message:"Not Found!"})
}
res.status(200).json({status:"showCodeAll is success",data:showAll})

  }catch(error){
    res.status(400).json({status:"showCodeAll-fail"});
  }
}

discountController.showCodeCheck = async (req, res) => {
  try {
    const codeId = req.params.id;
    const codes = await Discount.find({ code: { $regex: codeId } });
    
    if (codes.length === 0) {
      return res.status(404).json({ status: "Not Found!", message: "Invalid Code!" });
    }

    res.status(200).json({ status: "codeCheck-success", data: codes });
  } catch (error) {
    res.status(400).json({ status: "codeCheck-fail" });
  }
}


discountController.deleteCode = async (req,res)=>{
  try{
    const deleteCode = await Discount.findByIdAndDelete(req.params.id);
    res.status(200).json({status:"deleted-Code",data:deleteCode});
  }catch(error){
    res.status(400).json({status:'deleteCode-fail',error:error})
  }
}

module.exports = discountController