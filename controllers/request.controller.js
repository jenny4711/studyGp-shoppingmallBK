const Request = require("../models/Request")
const requestController={}
requestController.addRequest = async (req,res)=>{
  try{
    const {userId} = req;
    const { productId, size,qty,confirmed } =req.body;
    const requestItem = new Request({
      userId,
      productId,
      size,
      qty,
      confirmed,
    })
    await requestItem.save();
    res.status(200).json({status:'request-success',data:requestItem})


  }catch(error){
    res.status(400).json({ status: "product-fail" });
  }
}

requestController.getReqAdmin = async (req,res)=>{
  try{
    const showAll = await Request.find({}).populate('productId').populate('userId')

    if(!showAll){
      return res.status(404).json({status:'Not Found-requestItems!',message:"Not Have Request Item!"})
    }
    res.status(200).json({status:"requestItem-success",data:showAll})
    console.log(res,'request!!add')

  }catch(error){
    res.status(400).json({ status: "requestItem-fail" });
  }
 
}

requestController.deleteReqItem = async(req,res)=>{
  try{
    const deleteReq = await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({status:"deleted-req",data:deleteReq});
  }catch(error){
    res.status(400).json({status:'delete ReqItem-fail',error:error})
  }

}






module.exports = requestController

