import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';

import { connectToDatabase } from '../config/database.js';
import pacientesRoutes from './routes/pacientesRoutes.js';
import usuariosRoutes from './routes/usuarioRoutes.js';
import atendimentoRoutes from './routes/atendimentoRoutes.js';
import servicosRoutes from './routes/servicosRoutes.js';
import setorServicoRoutes from './routes/setorServicoRoutes.js'
import { seedUsuarios } from "./seeders/seedUsuarios.js";

import { setupSocket } from "./sockets/socket.js"; // import do módulo de socket
import { iniciarMonitorFila } from './filaExibicao.js';

iniciarMonitorFila(); // Inicia o monitoramento da fila de exibição

const app = express();
const server = http.createServer(app); 

setupSocket(server); 

app.use(cors({
  origin: ['http://localhost:5173', 'https://portaligreja.siaeserver.com', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/atendimentos', atendimentoRoutes);
app.use('/api/servicos', servicosRoutes)
app.use('/api/setores', setorServicoRoutes)
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToDatabase();
    await seedUsuarios();

    server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

  } catch (error) {
    console.error('Erro ao iniciar servidor: ', error);
    process.exit(1);
  }
};

startServer();
