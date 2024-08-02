const mongoose = require("mongoose");

const connection = async () =>{
    try{
        await mongoose.connect(`${process.env.DBURI}`)
        console.log("databse is connected successfully !")
    }catch(err){
        console.log(err.message)
    }
}

module.exports = connection;