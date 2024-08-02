const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hobbies:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('details', detailSchema)