const express = require('express');
const bodyParser = require('body-parser');


const server = express();
server.use(bodyParser.json());

//(cliente, e servidor)

//fisica -> MAC
//rede -> IP 
//transporte -> TCP ou UDP
//aplicacao  -> HTTP, HTTPS, FTP, SMTP, WEBSOCKET, MQTT


// web app vs  web service
// Paginas -- Servico (API, Streaming)

// API Restful (GET, POST, DELETE, PUT)
// GET -> Pegar algum recurso
// POST -> Para enviar algum recurso
// DELETE -> Pretendemos deletear um recurso
// PUT -> quando pretendemos atualizar

// URL

server.get('/', function (request, response){
    response.status(200).json({
        message: 'Servidor está funcionar'
    })

});



// recursos (users)

const users = [];
var lastId=1;

//tokens (jwt) ou sessoes (cookies)

// Get all
server.get('/users', function (request, response){
    response.status(200).json({
        data: users
    });
})

// Get id
server.get('/users/:id', function (request, response){
   const params =  request.params;
   
    //pegou o usuario da lista com id
   const user = users.find(function(_user){
        if(_user.id == params.id){
            return true;
        }
        return false;
   });

   //verificamos se o usuario foi encontrado
   if (user != null && user != undefined){

    response.status(200).json({
        data: user
    });

    return;
   }

   response.status(404).json({
    data:null
   });

})

// user Post
server.post('/users', function (request, response){

    const data = request.body;

   users.push({
    id: lastId, 
    nome: data.nome, 
    email: data.email, 

   });
   lastId++;
   
   response.status(201).json({
    success: true
   })

});


//delete user

server.delete('/users/:id', function (request, response){

    //pegamos os parametros
    const params = request.params;

    const indexUser = users.findIndex(function (user){
        if (user.id == params.id){
            return true;
        }
        return false;
    })

    if(indexUser != -1){
        users.splice(indexUser, 1);
        response.status(200).json({
            success:true
        })
        return;
    }

    response.status(404).json({
        success:false
    });



})


// update user
server.put('/users/:id', function (request, response){

      //pegamos os parametros
      const params = request.params;

      const user = users.find( function (_user){
        if (_user.id == params.id){
            return true;
        }
        return false;
      })

      if (user != null && user != undefined){

            const data = request.body;

            if(data.email != undefined){
                user.email = data.email;
            }

            if (data.nome != undefined){
                user.nome = data.nome;
            }

            response.status(200).json({
                success:true
            })

        return;
      }

      response.status(404).json({
        success:false
      })


  

});




server.listen(5500,   function  (){
    console.log('Servidor funcionado...');
})