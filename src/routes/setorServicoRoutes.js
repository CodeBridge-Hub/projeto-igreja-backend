import express from 'express';
import * as setorServicoController from '../controllers/setorServicoController.js';
// Importando apenas as funções necessárias de cada controller


const router = express.Router();

router.get('/:id_servico',
    setorServicoController.findAll 
)   

export default router;  