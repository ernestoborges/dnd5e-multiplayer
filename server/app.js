const express = require("express")
const app = express()

const http = require('http').Server(app);
const cors = require("cors")

app.use(cors())

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);

    // listen and logs the message to the console

    socket.on('message', (data) => {
        console.log(data)
        socketIO.emit('messageResponse', data);
    });
    
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

});

app.get("/", (req, res)=> {
    res.send("Hello, world!")
})

const PORT = 3333
http.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})