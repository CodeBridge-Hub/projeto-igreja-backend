import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
// Importando apenas as funções necessárias de cada controller


const router = express.Router();

router.get('/',
    usuarioController.findAll
)   

router.post('/user',
    usuarioController.findByEmail
)

router.post('/', 
    usuarioController.create
);

router.put('/:id', 
    usuarioController.update
);

router.delete('/:id', 
    usuarioController.remove
);

export default router;  