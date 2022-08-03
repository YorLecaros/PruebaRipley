const axios = require('axios');

const URL = process.env.DIALOG360_URL;
const APIKEY = process.env.DIALOG360_APIKEY;


const enviarMensajeHaciaWhatsapp = async (numero, texto) => {

    // Send a POST request
    const configRequest = {
        method: 'post',
        url: URL+'/v1/messages',
        headers: {
            'Content-Type': 'application/json',
            'D360-API-KEY': APIKEY
        },
        data: {
            "recipient_type": "individual",
            "to": numero,
            "type": "text",
            "text": {
                "body": texto
            }
        }
    }

    const resultado = await axios(configRequest);
    console.log(resultado);

}


module.exports = {
    enviarMensajeHaciaWhatsapp
}