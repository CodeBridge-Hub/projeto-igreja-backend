require('dotenv').config();
const express = require('express');


const{sequelize, connectDb} = require('../config/database');
const responsavelRouters = require('../routes/responsavelRoutes');
const atendimentoRouters = require('../routes/atendimentoRoutes')


const app = express()
//middlewares só usar quando as rotas forem definidas
app.use(express.json());
app.use('/api/responsavel', responsavelRouters);
app.use('/api/atendimento',atendimentoRouters);




const PORT = process.env.PORT || 3000

const startServer = async()=>
{
    try {
        await connectDb();

        await sequelize.sync({alter: true});

        app.listen(PORT, ()=>{
    console.log(`rodando na porta ${PORT}`)
});
        
    } catch (error) {
        console.error('error ao iniciar servidor: ', error);
        process.exit(1);
    }
};

startServer();





