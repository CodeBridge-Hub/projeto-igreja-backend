import 'dotenv/config';
import express from 'express';

import cors from 'cors';
import { connectToDatabase } from '../config/database.js';
import pacientesRoutes from './routes/pacientesRoutes.js';
import usuariosRoutes from './routes/usuarioRoutes.js';
import { seedUsuarios } from "./seeders/seedUsuarios.js";


const app = express()

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
  origin: ['http://localhost:5173', 'https://portaligreja.siaeserver.com'],
  credentials: true // se precisar enviar cookies ou autenticação
}));
//middlewares só usar quando as rotas forem definidas
app.use(express.json());
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/usuarios', usuariosRoutes);
const PORT = process.env.PORT || 3000

const startServer = async()=>
{
    try {
        await connectToDatabase();
        await seedUsuarios();

        app.listen(PORT, ()=>{
            console.log(`rodando na porta ${PORT}`)
});
        
    } catch (error) {
        console.error('error ao iniciar servidor: ', error);
        process.exit(1);
    }
};

startServer();





