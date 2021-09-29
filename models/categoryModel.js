const mongoose = require('mongoose')

const categoryScheme = mongoose.Schema({
 name:{type: String, trim:true, unique:true, required:true}
},{timestamps: true})

module.exports = mongoose.model('Category',categoryScheme)