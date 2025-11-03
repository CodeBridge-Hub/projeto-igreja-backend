import 'dotenv/config';
import express from 'express';

import cors from 'cors';
import { connectToDatabase } from '../config/database.js';
import pacientesRoutes from './routes/pacientesRoutes.js';


const app = express()

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: 'http://localhost:5173' // substitua pelo domínio da sua outra API ou front-end
}));
//middlewares só usar quando as rotas forem definidas
app.use(express.json());
app.use('/api/pacientes', pacientesRoutes);

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





