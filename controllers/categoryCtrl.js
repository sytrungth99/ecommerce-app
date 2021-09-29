const Category = require('../models/categoryModel')
const categoryCtrl ={
    getCategory :async(req,res) =>{
       try{
        const category = await Category.find()
        res.status(200).json(category)
       }catch(err){
        res.status(500).json({msg:err})
       }
    },
    createCategory: async(req,res) =>{
        try{
            const {name} = req.body
            const check = await Category.findOne({name})
            if(check) return res.status(500).json({msg:"this category already exists "})
            const category = await Category.create(req.body)
            res.status(200).json({
                msg:"create category success!",
                data:category
            })
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    deleteCategory : async(req,res) =>{
        try{
            await Category.findByIdAndDelete({_id:req.params.id})
            res.status(200).json({msg:'delete catagory success'})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    updateCategory : async (req,res) =>{
        try{
            const {name} = req.body
            const category = await Category.findByIdAndUpdate({_id: req.params.id}, {name})
            res.status(200).json(
               {category, msg:"update success"}
                )
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    }

}
module.exports = categoryCtrl