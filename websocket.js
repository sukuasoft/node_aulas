const express = require('express');
const  socketIO = require('socket.io');

//criado o servidor express
const server = express();

const serverWs = new socketIO.Server(5300);
serverWs.on('connection',  function (client){
    console.log(client);
})

// escutar requisicoes
server.listen(5500, function(){
    console.log('Servidor http funcionando');
})
