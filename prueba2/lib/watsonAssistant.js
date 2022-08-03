const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const express = require('express');
const app = express();
app.use(express.json());

const assistant = new AssistantV1({
  version: '2021-06-14', // YYYY-MM-DD
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY,
  }),
  serviceUrl: process.env.SERVICEURL, // Colocar URL del area de trabajo
});


const enviarMensaje = async (textoEntrante, context) => {
    
    try {
        let resultado = await assistant.message({
            workspaceId: process.env.SKILLID, // Colocar Skill ID
            input: {'text': textoEntrante},
            context
            });
        
        // console.log(resultado);
        return resultado.result;

    } catch(err) {
        console.log(err)
    }
      
}


module.exports = {
    enviarMensaje
}