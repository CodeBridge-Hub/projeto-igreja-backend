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

router.put('/call-next/:servicoId',
    atendimentoController.callNextAppointment
)   

export default router;