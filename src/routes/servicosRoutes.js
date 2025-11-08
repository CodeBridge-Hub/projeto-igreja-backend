import express from 'express';
import * as servicoController from '../controllers/servicoController.js';
// Importando apenas as funções necessárias de cada controller


const router = express.Router();

router.get('/',
    servicoController.findAll 
)   

export default router;  