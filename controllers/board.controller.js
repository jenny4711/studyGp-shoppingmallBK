const Board = require('../models/Board')
const boardController={};

boardController.createBoard= async (req,res)=>{
  try{
    const {title,img,visible}=req.body
    const board = new Board({
      title,
      img,
      visible,
    });
    await board.save();
    res.status(200).json({status:"createBoard-success",data:board})
  }catch(error){
    res.status(400).json({status:"createBoard-Fail"})
  }
}

boardController.allBoard=async (req,res)=>{
  try{
    const all = await Board.find({});
    if(!all || all.length === 0) {
      return res.status(404).json({status:"not found!",message:'not found!'})
    }
    res.status(200).json({status:"allBoard is success",data:all})
  }catch(error){
    res.status(400).json({status:"allBoard-fail",error:error});
  }
}
boardController.deleteBoard=async(req,res)=>{
  try{
    const deleteBoard = await Board.findByIdAndDelete(req.params.id)
    res.status(200).json({status:"deleted-board",data:deleteBoard});
   
  }catch(error){
    res.status(400).json({status:'deleteBoard-fail',error:error})
  }
}
boardController.makeInvisible=async(req,res)=>{
  try{
    const boardId=req.params.id;
    const {visible}=req.body;
    const board = await Board.findByIdAndUpdate(boardId,{visible});
    if(!board){
      return res.status(404).json({status:"Not Found the board",message:"couldn't find the board!"})

    }
    res.status(200).json({status:"makeInvisible-success",data:board});
  }catch(error){
    res
    .status(400)
    .json({ status: "makeInvisible-Fail!", error: error.message });
  }
}

module.exports=boardController