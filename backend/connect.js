const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB connected Successfully');
}).catch((err)=>{
    console.log('Connection problem',err);
})
