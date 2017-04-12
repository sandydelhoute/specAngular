const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
http.listen(PORT, () => console.log('Le serveur tourne'));

Players = [{'name':'alex','id':0},{'name':'pierre','id':1}];

io.sockets.on('connection', function (socket) {
    console.log('connection');
    socket.emit('players',Players);
    socket.on('addPlayer', function(playerName){
        console.log(playerName);
        Players.push({'name':playerName,'id':Players.length});
        console.log(Players);
        io.emit("players",Players);
    });
    

    socket.on('addmessage',function(message){
    	console.log(message);
    	io.emit('newmessage',message);
    });

});