import express from 'express';
import Consulta_especialidade from '../models/consulta_especialidade.js';

const router = express.Router();

router.post('/', async(req, res)=>{
    try {
        const consulta_especialidade = await Consulta_especialidade.create(req.body);
        res.status(201).json({ message: 'Consulta criada com sucesso', consulta_especialidade });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar consulta', error: error.message });
    }
});

//get
router.get('/', async(req, res)=>{
    try {
        const consultas = await Consulta_especialidade.findAll();
        res.json(consultas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar consultas', error: error.message });
    }
})

//update
router.put('/:id', async(req, res)=>{
    try {
        const consulta_especialidade = await Consulta_especialidade.findByPk(req.params.id);
        
        if (!consulta_especialidade) {
            return res.status(404).json({ message: 'Consulta não encontrada' });
        }

        await consulta_especialidade.update(req.body);
        res.json({ message: 'Consulta atualizada com sucesso', consulta_especialidade });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar consulta', error: error.message });
    }
});

//delete
router.delete('/:id', async(req, res)=>{
    try {
        const consulta_especialidade = await Consulta_especialidade.findByPk(req.params.id);
        
        if (consulta_especialidade) {
            await consulta_especialidade.destroy();
            res.status(200).json({ message: 'Consulta deletada com sucesso' });
        } else {
            res.status(404).json({ message: 'Consulta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar consulta', error: error.message });
    }
});

export default router;