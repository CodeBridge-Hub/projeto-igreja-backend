import 'dotenv/config';
import express from 'express';


import { connectToDatabase } from '../config/database.js';
import responsavelRouters from './routes/responsavelRoutes.js';
import atendimentoRouters from'./routes/atendimentoRoutes.js';
import usuarioRouters from './routes/usuarioRoutes.js'

const app = express()
//middlewares só usar quando as rotas forem definidas
app.use(express.json());
app.use('/api/responsavel', responsavelRouters);
app.use('/api/atendimento', atendimentoRouters);
app.use('api/usuario', usuarioRouters)

const PORT = process.env.PORT || 3000

const startServer = async()=>
{
    try {
        await connectToDatabase();

        app.listen(PORT, ()=>{
            console.log(`rodando na porta ${PORT}`)
});
        
    } catch (error) {
        console.error('error ao iniciar servidor: ', error);
        process.exit(1);
    }
};

startServer();





