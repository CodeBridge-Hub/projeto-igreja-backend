import express from 'express';
import Biomedicina from '../models/biomedicina.js';

const router = express.Router();

router.post('/', async(req, res)=>{
    try {
        const biomedicina = await Biomedicina.create(req.body);
        res.status(201).json({ message: 'Registro de biomedicina criado', biomedicina });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar registro', error: error.message });
    }
});

//get
router.get('/', async(req, res)=>{
    try {
        const registros = await Biomedicina.findAll();
        res.json(registros);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar registros', error: error.message });
    }
})

//update
router.put('/:id', async(req, res)=>{
    try {
        const biomedicina = await Biomedicina.findByPk(req.params.id);
        
        if (!biomedicina) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        await biomedicina.update(req.body);
        res.json({ message: 'Registro atualizado com sucesso', biomedicina });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar registro', error: error.message });
    }
})

//delete
router.delete('/:id', async(req, res)=>{
    try {
        const biomedicina = await Biomedicina.findByPk(req.params.id);

        if (biomedicina) {
            await biomedicina.destroy();
            res.status(200).json({ message: 'Registro deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Registro não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar registro', error: error.message });
    }
});

export default router;