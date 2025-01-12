const express = require('express');

const server = express();

// Middleware


// Authorization Bearer 123

const authMiddleware = function (request, response, next){
 //undefined | null
    const token = request.headers.authorization.split(' ')[1];

    if (token == '123'){
        //quer que é valido
        next();
    }
    else{
        response.sendStatus(401);
    }

}


server.get('/', authMiddleware,function(request, response){
    response.status(200).json({
        message: 'Bem vindo!'
    })
})

server.listen (5500, function (){
    console.log('Servidor rodando...')
})