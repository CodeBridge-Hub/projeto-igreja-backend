import express from 'express';
import * as pacienteController from '../controllers/pacientesController.js';
// Importando apenas as funções necessárias de cada controller


const router = express.Router();

router.get('/',
    pacienteController.findAll
)   

router.post('/create',
    pacienteController.create
)   

export default router;