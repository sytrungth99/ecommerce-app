const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{type:String, trim:true, unique:true,require:[true,'username is not empty']},
    email:{type:String, trim:true, unique:true,require:[true,'email is not empty']},
    password:{type:String, trim:true, unique:true,require:[true,'password is not empty']},
    role:{type:Number,default:0},
    avatar:{type: String, default:"https://image.shutterstock.com/image-vector/empty-photo-male-profile-gray-260nw-538707310.jpg"},
    cart:{type:Array,default:[]}
},{timestamps:true})

 userSchema.pre('save',function(next){
     const user = this
    bcrypt.hash(user.password,10,(error,hash) =>{
        if(error){
            return next(error)
        }else{
            user.password = hash
            next()
        }
    })
 })

 const Users =  mongoose.model('User',userSchema)
 module.exports = Users