const jwt = require('jsonwebtoken')

const Auth = (req,res,next) =>{
    try{
        const Authorization = req.header('authorization')
        
        if(!Authorization) return res.status(500).json({msg:'Invalid authorization'})
        const token = Authorization.replace('Bearer','')
        jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,use) =>{
            req.use = use
            next()
        })
    }catch(err){
        return res.status(500).json({msg:err.message})
    }

}

module.exports = Auth