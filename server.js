//node server which will handells socket.io conections


const fs = require('fs');
const express = require('express')
const app = express()

const http = require('http').createServer(app)
var i = 0;

const PORT = process.env.PORT || 4000


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname + '/'))

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/chat.html')


})

/// [ socket.io]/// 
const io = require('socket.io')(http ,{
    maxHttpBufferSize: 1e8
});
var users = {};



io.on('connection', (socket) => {
    console.log('connected...')

    socket.on('joined-user', (names) => {

        users[socket.id] = names;

        io.emit("user-list", users);


    })


    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)

    })



    socket.on('disconnect', () => {
        // var user=users[socket.id];
        socket.broadcast.emit('user-disconnected', usee = users[socket.id]);
        delete users[socket.id];
        io.emit("user-list", users);
        
         for (let l = 0  ;l <= i; l++) {



            fs.unlink("public/upload" + l + ".jpg", function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("File removed:");
                }
            });
        }
        i = 0;

    })
    
     socket.on("upload", (file, callback) => {
        console.log(file); // <Buffer 25 50 44 ...>
io.emit("imgStack", i);
        // save the content to the disk, for example
        fs.writeFile("upload"+i+".jpg", file, (err) => {
            callback({ message: err ? "failure" : "success" });
            i++;
        });
    });

    
})
