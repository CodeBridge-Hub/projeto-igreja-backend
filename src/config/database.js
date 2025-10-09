require('dotenv').config()
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
     {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
     }
);

const connectDb = async()=>{
   try {
       console.log("1. Lendo variáveis de ambiente...");
        console.log(`DB_HOST: ${process.env.DB_HOST}, DB_USER: ${process.env.DB_USER}`);

         const connection  = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
         });

         console.log("2. Conexão com o servidor MySQL estabelecida.");
               await connection.query(`CREATE DATABASE IF NOT EXISTS \` ${process.env.DB_NAME}\``)
               await connection.end();

               await sequelize.authenticate();
               console.log("4. Conexão com Sequelize ao banco de dados estabelecida.");



   } catch (error) {
      console.error('erro na conexão com o servidor: ', error);
      process.exit(1)
   }
}
module.exports = {sequelize, connectDb}