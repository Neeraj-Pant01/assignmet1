const detailModel = require("../models/details.model");

exports.insertData = async (req, res) => {
    try {
        const entry = await detailModel.findOne({ email: req.body.email })
        if (entry) return res.status(400).json({ message: "entry with this email already exists" })

        const newEntry = new detailModel(req.body);
        await newEntry.save();
        res.status(200).json(newEntry)
    } catch (err) {
        res.status(400).json({message:err})
    }
}

exports.getData = async (req,res) =>{
    try{
        const entries = await detailModel.find();
        res.status(200).json(entries);
    }catch(err){
        res.status(400).json({message:err})
    }
}

exports.getSinleItem = async (req,res) =>{
    try{
        const entry = await detailModel.findById(req.params.id);
        res.status(200).json(entry);
    }catch(err){
        res.status(400).json({message:err})
    }
}

exports.updateData = async (req,res) =>{
    try{
        const entry = await detailModel.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{
            new : true
        })
        res.status(200).json(entry)
    }catch(err){
        res.status(400).json({message:err})
    }
}

exports.deleteData = async (req,res) =>{
    try{
        await detailModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"entry deleted successfully !"})
    }catch(err){
        res.status(400).json({message:err})
    }
}