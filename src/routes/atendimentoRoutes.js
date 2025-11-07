import express from 'express';
import * as atendimentoController from '../controllers/atendimentoController.js';

const router = express.Router();

router.get('/waiting',
    atendimentoController.getAvailableAppointments
)

router.get('/next-available',
    atendimentoController.getNextAvailableAppointment
)

router.get('/next-available/:id_servico',
    atendimentoController.getNextAvailableAppointmentByService
)

router.get('/called/:id_servico',
    atendimentoController.getCalledAppointmentByService
)

router.get('/in-progress/:id_servico',
    atendimentoController.getProgressAppointmentByService
)

router.put('/start/:id',
    atendimentoController.startAppointment
)

router.put('/call-next/:servicoId',
    atendimentoController.callNextAppointment
)   

router.put("/finish-appointment/:id", 
    atendimentoController.finishAppointmentById
);


export default router;