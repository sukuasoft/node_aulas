const fs = require('fs/promises');
const path = require('path');
const firebaseAdmin = require('firebase-admin');
const express = require('express');
const {sign, verify} = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

// CORS

const firebaseKeyFile = path.resolve(__dirname, 
    'firebase-admin-key.json');

async function main (){

    const server = express();
    server.use(express.json());
    server.use(cors());
 

    //inicio do server
    const fileContent = await fs.readFile(firebaseKeyFile, {
        encoding: 'utf-8'
    });

    const admin = firebaseAdmin.initializeApp(
        {
            credential: firebaseAdmin.credential.cert(JSON.parse(fileContent))
        }
    );



    server.post('/register', async (request, response)=>{
        const data = request.body;

        let user= null;
        
        try{
            user = await admin.auth().createUser({
                email: data.email,
                displayName: data.nome, 
                password: data.password, 
    
           });
           

    
        } catch (e){
            response.sendStatus(400);
        }

        if (user){
            const token = sign({
                id: user.uid
                }, process.env.JWT_KEY);
        
            
                response.status(200).json({
                    data: {
                        token: token
                    }
                });
        }

        else{
            response.sendStatus(500);
        }

      
    
    
    });
    
    server.post('/login', async (request, response)=>{
        const data = request.body;

        let user =null;
        try{
            const tokenDecoded = await admin.auth().verifyIdToken(data.tokenId); 
      
            user = await admin.auth().getUser(tokenDecoded.uid);
        } catch (e){
            response.sendStatus(400);
        }

        if (user){
    
            const token = sign({
                id: user.uid
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
    
    
    
            let user=null;
            try {
                user = await admin.auth().getUser(tokenDecoded.id);
            } catch (e){
                response.sendStatus(400);
            }
    
    
            console.log(tokenDecoded.id);
            response.status(200).json({
                message: 'Bem de volta usuário '+ tokenDecoded.id, 
                data:{
                nome: user.displayName, 
                email: user.email, 
                id: user.uid
                }
            })
    
        } catch (error) {
           
            response.sendStatus(404);
          
        }
    
    
    
    
    
    });
    
    server.listen(5500, ()=>{
    console.log('Servidor rodando'); 
    });
    

}

main();