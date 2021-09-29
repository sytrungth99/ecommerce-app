
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title: {type:String,unique:true,trim:true,required:true},
    price: {type:Number,unique:true,trim:true,required:true},
    images: {type:Object,trim:true,required:true},
    description: {type:String,trim:true,required:true},
    numReviews: {type:Number,required:true,default:0},
    rating: {type:Number,required:true,default:0},
    checked:{type:Boolean,default:false},
    category:{type:String,require:true},
    sold:{type:Number,default:0}
}, {
    timestamps: true
})


module.exports = mongoose.model('Products', productSchema)