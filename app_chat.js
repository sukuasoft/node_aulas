const  socketIO = require('socket.io');

const server =  new socketIO.Server();

// id, nome, socket
//
const usersConnected = [];
let lastId = 1;

//escutar as conexoes
server.on('connection', function (socket){

    const data = socket.handshake.query;
    const idUser= lastId;

    
    usersConnected.push({
        id: idUser, 
        nome: data.nome, 
        socket: socket
    });


    lastId++;

    //escutar cada das  mensagens recebidas da conexao com cliente
    socket.on('send-message', function (message){
        const user = usersConnected.find(function (user){
            if (user.id == message.sendToId){
                return true;

            }
            return false;
        })
        console.log(user);

            //undefined | null -> false
            if (user != null){
                user.socket.emit('recieve-message', {
                    message: message.message, 
                    sender: {
                        nome: data.nome, 
                        id: idUser
                    }
                })

            }

   
    })

})


server.listen(5300);