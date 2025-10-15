import express from 'express';
import Responsavel from '../models/responsavel.js';

const router = express.Router();

//create
router.post('/', async(req, res)=>{
    try {
        const responsavel = await Responsavel.create(req.body);
        res.status(201).json({ message: 'Responsável criado com sucesso', responsavel });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar responsável', error: error.message });
    }
});

//get
router.get('/', async(req, res)=>{
    try {
        const responsaveis = await Responsavel.findAll();
        res.json(responsaveis);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar responsáveis', error: error.message });
    }
})

//update
router.put('/:id', async(req, res)=>{
    try {
        const responsavel = await Responsavel.findByPk(req.params.id);
        
        if (responsavel) {
            await responsavel.update(req.body);
            res.json({ message: 'Responsável atualizado com sucesso', responsavel });
        } else {
            res.status(404).json({ message: 'Responsável não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar responsável', error: error.message });
    }
})

//delete
router.delete('/:id', async(req, res)=>{
    try {
        const responsavel = await Responsavel.findByPk(req.params.id);
        
        if (responsavel) {
            await responsavel.destroy();
            res.status(200).json({ message: 'Responsável deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Responsável não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar responsável', error: error.message });
    }
});

export default router;