const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userControler = {
    
     setRegister : async (req,res) =>{
        try{
            const {username,email,password} = req.body
            const user = await Users.create(req.body)
            
            if(!username||!email||!password) return res.status(500).json({
                msg:'you must fill all'
            })

            if(!validateEmail(email))
            return res.status(400).json({msg: "Invalid emails."})

            if(password.length< 6) return res.status(500).json({
                msg:'password too short'
            })
            res.status(200).json({
                msg:'success',
                user:{user}
            })
        }catch(err){
           return res.status(500).json(err)
        }
    },
    setLogin: async(req,res) =>{
        try{
            const {email,password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(500).json({msg:'email is not exits'})
            const match = await bcrypt.compare(password,user.password)
            if(!match) return res.status(500).json({msg:'password is not exits'})
            const refresh_token = createRefreshToken({id: user._id})
            res.status(200).json({
                msg:'login success',
                token:refresh_token
            })
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    getUserInfor: async (req,res,next) =>{
        try{
            const use = req.use
            const user = await Users.findById(use.id)
            if(!user) return res.status(500).json({msg:'invalid user'})
            res.status(200).json({
                msg:'success',
                user:user
            })

        }catch(err){
            return res.status(500).json(err)
        }
    },
    addCart: async (req,res) =>{
        try{
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(500).json({msg:"User does not exist."})
            await Users.findOneAndUpdate({_id:req.user.id},{
                cart:req.body.cart
            })
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    getAllUser: async (req,res) =>{
        try{
            const users = await Users.find()
            res.status(200).json(users)        
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports = userControler