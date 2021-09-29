const mongose = require('mongoose')

const commentSchema = new mongose.Schema({
    username: String,
    content: String,
    product_id: String,
    rating:{
        type:Number,
        default:0
    },
    reply: Array
},{timestamps : true})

module.exports = mongose.model('Comments',commentSchema)