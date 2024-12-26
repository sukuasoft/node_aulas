//importar biblioteca
const express = require('express');


//criamos o servidor
const server = express();

// get, -> pedido, consultar
// post -> envio, carregar , 
// delete -> remocao, deletar, 
// put -> atualizar

server.get('/', function (request, response){
    //json
    //text
    //ficheiro
    //xml
    response.status(200).json({
        message: 'Foi um sucesso!'
    })

    // 200 -> feito
    //201 -> criado

    //404 -> nao encontrou
    //500 -> erro interno.

})


//servidor a rodar
server.listen(5500, function (){
   console.log('Servidor a funcionar')
});