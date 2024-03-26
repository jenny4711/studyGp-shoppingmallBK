const userController = {}
const User = require('../models/User')
const bcrypt = require("bcryptjs")

userController.createUser = async(req,res)=>{
  try{
    let {email , password,firstName,lastName ,address ,level }=req.body
    const user = await User.findOne({email})
    if(user){
      throw new Error("User already exist!")
    }
const salt = await bcrypt.genSaltSync(10)
password = await bcrypt.hash(password,salt)
const newUser = new User({email,password,firstName,lastName,address,level:level?level:'customer'})
await newUser.save()
return res.status(200).json({status:"success!"})


  }catch(error){
    res.status(400).json({status:'Fail',error:error.message})
  }
}

userController.getUser = async(req,res)=>{
  try{
    const {userId} = req;
    
    const user = await User.findById(userId)
    if(user){
      res.status(200).json({status:'success',user})
    }else{
      throw new Error("Invalid token")
    }
   

  }catch(error){
    res.status(400).json({status:'Fail',error:error.message})
  }
}

userController.updateUserInfo=async(req,res)=>{
  try{
    const userId = req.params.id;
    let {email , password,firstName,lastName ,address ,level }=req.body
     const newUser = await User.findByIdAndUpdate(
      userId,
      {email , password,firstName,lastName ,address ,level }
     )
     if(!newUser){
      return res.status(404).json({status:'Not Found-user',message:"there is no info"})
     }
     res.status(200).json({status:"success-update userInfo",data:newUser})
    }
   

  catch(error){
    res.status(400).json({status:'Fail-updateInfo',error:error.message})
  }
}


module.exports = userController