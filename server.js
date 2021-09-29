require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Comments = require('./models/commentModel')
const fileUpload = require('express-fileupload')
const path = require('path')



const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

const http = require('http').createServer(app)
const io = require('socket.io')(http)


// Soketio
var users = []

io.on('connection', socket => {
    console.log(socket.id + ' connected.')

    socket.on('joinRoom',id =>{
         
        const user = {userId :socket.id, room:id }

        //kiem tra từng user trong users
        const check = users.every(user => user.userId !== socket.id)
        if(check){
            users.push(user)
            socket.join(user.room)
        }else{
            users.map(user =>{
                if(user.userId === socket.id){
                    if(user.room !== id){
                        console.log('hello')
                        socket.leave(user.room)
                        socket.join(id)
                        user.room = id
                    }
                }
            })
        }
    })    
    socket.on('createComment',async data =>{
        const {username, content, product_id, createdAt, rating} = data

        const newComment = new Comments({
            username, content, product_id, createdAt, rating
        })
        await newComment.save()
        console.log('comment',newComment)
        io.to(newComment.product_id).emit('sendCommentToClient',newComment)
    })
})


// Routes
app.use('/api', require('./routes/productRoute'))
app.use('/api', require('./routes/commentRoute'))
app.use('/api',require('./routes/authRoute'))
app.use('/api',require('./routes/categoryRoute'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/historyRoute'))



// Connection to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}



// Listen server
const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
    console.log('Serveris running on port', PORT)
})