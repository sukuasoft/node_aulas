const  socketIO = require('socket.io');

const server =  new socketIO.Server();

const messages = [];

server.on('connection', function(socket) {
    console.log('usuário esta conectado');
    socket.on('message', onMessage);
})

function onMessage (message){
    messages.push(message);
    console.log(message);

    server.emit('recieve-message', messages);
}

server.listen(5300);