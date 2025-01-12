// Firestore vs Realtime Database

const express = require("express");
const firebaseAdmin = require("firebase-admin");
const path = require('path');
const fs = require('fs/promises');

const firebaseKeyFile = path.resolve(__dirname, "firebase-admin-key.json");

async function main() {
  const server = express();
  server.use(express.json());

  //pegar o arquivo
  const fileContent = await fs.readFile(firebaseKeyFile, {
    encoding: "utf-8",
  });

  //é pegar o admin com as credencias do arquivo
  const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(fileContent)),
  });  

  //produtos (nome, descricao e preco)


  //create
  server.post('/produtos', async function (request, response){
    const data = request.body;

    // collection, document
    await admin.firestore().collection('produtos').doc().create({
        nome: data.nome, 
        descricao: data.descricao, 
        preco: data.preco
    });
    
    response.status(201).json({
        message: 'Produto adicionado'
    })
  })

  //read all
  server.get('/produtos', async function (request, response){
    const resultDocs = await admin.firestore().collection('produtos').get();
   
    const dataDocs = resultDocs.docs.map(function (doc){

        return {
            id: doc.id, 
            ...doc.data()
        }

    })

    response.status(200).json({
        data: dataDocs
    });
    
  })

  //read only
  server.get('/produtos/:id', async function (request, response) {
    const params = request.params;

    const docResult = await admin.firestore().collection('produtos').doc(params.id).get();
    

    if (docResult.exists){
        const docData = {
            id: docResult.id, 
            ...docResult.data()
        }
    
        response.status(200).json({
            data: docData
        })
    }
    else{
        response.sendStatus(404);
    }

  })

  //update 
  server.put('/produtos/:id', async function (request, response){
    const params = request.params;
    const data = request.body;

    const updates = {};

    const possibleUpdates= ['nome', 'descricao', 'preco'];
    //const possibleUpdatesKeys = Object.keys(possibleUpdates);
    for(const key of possibleUpdates){
        if (data[key]){
            updates[key] = data[key];
        }
    }
    

    await admin.firestore().collection('produtos').doc(params.id).update(updates);
    response.status(200).json({
        message: 'Usuário atualizado'
    })


  });

  //delete
  server.delete('/produtos/:id', async function (request, response){
    const params = request.params;

    await admin.firestore().collection('produtos').doc(params.id).delete();

    response.status(200).json({
        message: 'Usuário deletado'
    })
  })



  server.listen(5500, function () {
    console.log("Servidor rodando...");
  });
}

main();
