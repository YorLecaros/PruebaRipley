// OTRA FORMA DE REALIZAR CONEXION

const { Client } = require('pg');

const connectionData = {
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 5432
}

const client = new Client(connectionData);

client.connect();

const getInfo = async () => {
  const result = await client.query('select * from  productos;');
  console.log(result.rows);
  
  client.end();
};


module.exports = {
  getInfo
}