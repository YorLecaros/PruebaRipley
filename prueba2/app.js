require('dotenv').config();
const express = require('express');

const watsonAssistant = require('./lib/watsonAssistant');
const Dialog360 = require('./lib/360Dialog');
const { guardarContext, actualizarContext, listarContext } = require('./models/contextoModel');

const app = express();
const port = process.env.PORT;

// Aceptar formatos JSON en nuestro servidor
app.use(express.json());

// let contexto = {};

// Recibimos los webhook que nos envía 360Dialog
// Cuando montamos un servicio de webhook lo normal
// es que se haga mediante una solicitud POST
app.post('/webhook', async function (req, res) {
    console.log('Datos Entrantes: ', JSON.stringify(req.body, null, " "));

    if (req.body.statuses) {
        res.status(200).end();
        return;
    }

    const mensaje = req.body.messages[0];
    const { from:numero , text:texto } = mensaje;

    console.log('Celular usuario:', numero);
    console.log('Texto usuario:', texto.body);
    console.log(texto.body, typeof texto.body);

    let contextListado = await listarContext(numero);
    // console.log('Holaaaaaa: ', JSON.parse(contextListado[0].contexto));
    // console.log('Holaaaaaa: ',typeof JSON.parse(contextListado[0].contexto));

    if(contextListado.length <= 0) {
        let contextoNuevo = {};
        await guardarContext(numero,contextoNuevo);
        // console.log(typeof contextListado);
        // contextListado = await listarContext(numero);
        // console.log('Aqui x000000: ', contextListado);

        const { output, context } = await watsonAssistant.enviarMensaje(texto.body, contextoNuevo);
        console.log('Heyyyyy: ', output);
        console.log('Aqui x111111: ', context);
        // contexto = context;
        // let contextoString = JSON.stringify(context);
        // console.log(contextoString.length); //279
        
        await actualizarContext(numero, JSON.stringify(context));
        // contextListado = await listarContext(numero);
        // console.log(typeof contextListado);
        // contexto = contextListado;
        // console.log('Muestra de contexto: ', contexto);
        

        for (const text of output.text) {
            console.log('Respuesta Bot:', text);
            await Dialog360.enviarMensajeHaciaWhatsapp(numero, text);
        }

    } else if(contextListado.length > 0) {

        const { output, context } = await watsonAssistant.enviarMensaje(texto.body, JSON.parse(contextListado[0].contexto));
        console.log('Aqui x222222: ', context);
        
        await actualizarContext(numero, JSON.stringify(context));

        for (const text of output.text) {
            console.log('Respuesta Bot:', text);
            await Dialog360.enviarMensajeHaciaWhatsapp(numero, text);
        }

    }
    
    res.status(200).end();
});


// Ejecuta el servidor por un puerto
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});