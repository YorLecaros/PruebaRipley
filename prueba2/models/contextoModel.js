const db = require('../database/config');


// Para guardar context - watson - whatsapp
const guardarContext = async (phoneNumber, context) => {
    const query = `INSERT INTO datosContexto (phoneNumber, contexto) VALUES ('${phoneNumber}','{${context}}');`;
    const resultado = await db.query(query);

    return resultado;
  }
  
  const actualizarContext = async (phoneNumber, context) => {
    const query = ` UPDATE datosContexto SET contexto = '${context}' WHERE phoneNumber = '${phoneNumber}';`;
    const resultado = await db.query(query);

    return resultado;
  }
  
  const listarContext = async (phoneNumber) => {
    const query = `SELECT contexto FROM datosContexto WHERE phoneNumber = '${phoneNumber}';`;
    const resultado = await db.query(query);

    return resultado.rows;
  }


  module.exports = {
      guardarContext,
      actualizarContext,
      listarContext
  }