import express from 'express';
import Usuario from '../models/usuario.js';

const router = express.Router();

//create
router.post('/', async(req, res)=>{
  try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});

//get
router.get('/', async(req, res)=>{
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
})

//update
router.put('/:id', async(req, res)=>{
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await usuario.update(req.body);
        res.json({ message: 'Usuário atualizado com sucesso', usuario });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
})

//delete
router.delete('/:id', async(req, res)=>{
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        
        if (usuario) {
            await usuario.destroy();
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
    }
});

module.exports = router;