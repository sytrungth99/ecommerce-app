const Historys = require('../models/historyModel')
const historyCtrl ={
    getHistory :async(req,res) =>{
       try{
        const history = await Historys.find()
        res.status(200).json(history)
       }catch(err){
        res.status(500).json({msg:err})
       }
    },
    createHistory :async(req,res) =>{
        try{
         const history = await Historys.create(req.body)
         res.status(200).json(history)
        }catch(err){
         res.status(500).json({msg:err})
        }
     }
}

module.exports = historyCtrl