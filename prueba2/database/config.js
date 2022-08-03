const { Pool } = require('pg');
const fs = require('fs');

const connectionString = process.env.POSTGRESDB_CNN;

const pool = new Pool({
  connectionString,
  ssl: {
    // rejectUnauthorized: false,
    ca: fs.readFileSync('./certificate.crt').toString(),
  },
});


const query = async (querySQL) => {
  try {
    // const resultado = await pool.query(querySQL);
    return await pool.query(querySQL);

  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos');
  }
};


module.exports = {
  query
}