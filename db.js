import { PrismaClient
 } from "@prisma/client";
 import express from "express";
 import {hashSync, hash} from "bcrypt";
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

// token (jwt)


// npm install dotenv para variaveis de ambiente


server.post('/register', async (request, response)=>{
    const data = request.body;
    

    const user =await prisma.user.create({
        data: {
            nome: data.nome, 
            email: data.email, 
            password: await hash(data.password)
        }
    })

    user.id
    

});

server.post('/login', ()=>{

});

server.get('/home', ()=>{

});

server.listen(5500, ()=>{
console.log('Servidor rodando'); 
});
