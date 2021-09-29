const mongoose = require('mongoose')

const historysScheme = mongoose.Schema({
 name:{type: String, trim:true},
 sdt:{type: Number, trim:true},
 product:{type: String, trim:true}
},{timestamps: true})

module.exports = mongoose.model('Historys',historysScheme)