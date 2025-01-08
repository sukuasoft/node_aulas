const { PrismaClient
 }  = require("@prisma/client");
 const express = require("express");
 const {hashSync, hash} = require("bcrypt");
 const { sign, verify} =  require ("jsonwebtoken");
// ORM vs SQL vs NoSQL
// Object Relation Mapping
// insert into users (nome, email) values ("nome", '${nome}')

//ORM
// TypeORM, Prisma, Sequelize

//Prisma (Migrations, Entities ou Model, Client)


// instalar o prisma (npm install prisma)

//gerar o schema (npx prisma init)

//para realizar uma migration (npx prisma migrate dev)

//para gerar prisma client (npx prisma generate)

const prisma = new PrismaClient();

const server = express();
server.use(express.json());

// tipos de autenticacao

// tokens, sessao, oauth, basic auth

// token (jwt) npm install jsonwebtoken


// npm install dotenv para variaveis de ambiente


server.post('/register', async (request, response)=>{
    const data = request.body;
    

    const user = await prisma.user.create({
        data: {
            nome: data.nome, 
            email: data.email, 
            password: data.password
        }
    });

    const token = sign({
        id: user.id
    }, process.env.JWT_KEY);

    
    response.status(200).json({
        data: {
            token: token
        }
    });

});

server.post('/login', async (request, response)=>{
    const data = request.body;

    const user = await prisma.user.findFirst({
        where:{
            'email': data.email,
            'password': data.password
        }
    });

    if (user){

        const token = sign({
            id: user.id
        }, process.env.JWT_KEY);

        response.status(200).json({
            data: {
               token: token
            }
        })
    }
    else{
        response.status(400).json({
            message: 'Credencias inválidas'
        })
    }

});

//home
server.get('/home', async (request, response)=>{
    const auth = request.headers.authorization;

    const token = auth.split(' ')[1];

    try {
    
        const tokenDecoded = verify(token, process.env.JWT_KEY);



        const user = await prisma.user.findFirst({
            where: {
                "id": tokenDecoded.id
            }
        });


        console.log(tokenDecoded.id);
        response.status(200).json({
            message: 'Bem de volta usuário '+ tokenDecoded.id, 
            data:user
        })

    } catch (error) {
       
        response.sendStatus(404);
      
    }





});

server.listen(5500, ()=>{
console.log('Servidor rodando'); 
});
