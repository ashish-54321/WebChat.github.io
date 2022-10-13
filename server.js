//node server which will handells socket.io conections

const express = require('express')
const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 4000


http.listen(PORT, () => {
    console.log (`Listening on port ${PORT}`) 
})
app.use(express.static(__dirname + '/public')) 

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/Chat.html')
    // app.use(express.static(__dirname + 'chat.css')) 
    
} )

/// [ socket.io]/// 
const io = require('socket.io')(http)




io.on('connection', (socket) =>{
    console.log('connected...')

    

    socket.on('message' , (msg) =>{
        socket.broadcast.emit('message', msg)
    })
})
