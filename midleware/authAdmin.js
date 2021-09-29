const Users = require('../models/userModel')

const authAdmin = async(req,res,next) =>{
    try{
        const user = await Users.findOne({_id:req.use.id})
        if(user.role===0)
        return res.status(400).json({msg:"admin is access denied"})
        next()
    }catch(err){
        res.status(500).json('sai')
    }
}

module.exports = authAdmin