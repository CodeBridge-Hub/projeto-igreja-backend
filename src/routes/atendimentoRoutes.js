import express from 'express';
import Atendimento from '../models/Atendimento.js';

const router = express.Router();

//post
router.post('/', async(req, res)=>{
    try {
        const atendimento = await Atendimento.create(req.body);
        res.status(201).json({ message: 'Atendimento criado com sucesso', atendimento });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

//get
router.get('/', async(req, res)=>{
    try {
        const atendimentos = await Atendimento.findAll();
        res.json(atendimentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//update
router.put('/:id', async(req, res)=>{
    try {
        const atendimento = await Atendimento.findByPk(req.params.id);
        if (atendimento) {
            await atendimento.update(req.body);
            res.json({ message: 'Atendimento atualizado com sucesso', atendimento });
        } else {
            res.status(404).json({ message: 'Atendimento não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

//delete
router.delete('/:id', async(req, res)=>{
    try {
        const atendimento = await Atendimento.findByPk(req.params.id);
        if (atendimento) {
            await atendimento.destroy();
            res.status(200).json({ message: 'Atendimento deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Atendimento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;