const mongoose = require('mongoose');

const DB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    }catch (e){
        console.log(e);
        
    }
}

module.exports = DB;