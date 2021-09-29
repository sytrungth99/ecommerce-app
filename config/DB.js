const mongoose = require('mongoose');
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect('mongodb+srv://sytrung:sytrung@comment.vva8c.mongodb.net/socket-realtime?retryWrites=true&w=majority',{
            useUnifiedTopology : true,
            useNewUrlParser : true,
            useCreateIndex :true
        })
        console.log('DB connect successfully')
    }catch (error) {
        console.log(error);
    }
}
module.exports = {connectDB}