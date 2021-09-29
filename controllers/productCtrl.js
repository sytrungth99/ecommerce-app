const Products = require('../models/produceModel')
class APIfeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString
    }
    filtering(){
        const queryObject = {...this.queryString}
        const excludeFiels = ['page','sort','limit']
        excludeFiels.forEach(el =>delete(queryObject[el]))
        let queryStr = JSON.stringify(queryObject)
        
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
           this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
}

const productCtrl = {
    getProducts : async(req,res) =>{
        try{
            const feature = new APIfeatures(Products.find(),req.query).filtering().sorting()
            const products =await feature.query
            res.json({products})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    review:async(req,res) =>{
        try{
            const {rating} = req.body

            if(rating&& rating !==0){
                const products =await Products.findById(req.params.id)
                if(!products) return res.status(400).json({msg:"product does not exits"})
                let num = products.numReviews
                let rate = products.rating
                await Products.findOneAndUpdate({_id:req.params.id},{
                    rating:rate +rating, numReviews:num +1
                })
                res.json({msg:'update success'})
            }
            
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteProduct : async(req,res) =>{
        try{
            await Products.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:"delete sucessfuly"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateProduct : async(req,res) =>{
        try{
            const {title,images,category,price,description} = req.body
            await Products.findByIdAndUpdate({_id:req.params.id},{title,images,category,price,description})
            res.status(200).json({
                msg:"update success"
            })
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createProduct : async(req,res) =>{
        try{
            const {images} = req.body
            if(!images) return res.status(400).json({msg: "No image upload"})
            const newProduct = await Products.create(req.body)

            res.status(200).json({
                msg:"created product",
                newProduct
            })

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
}

module.exports = productCtrl