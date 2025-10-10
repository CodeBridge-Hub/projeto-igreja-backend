const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

//create
router.post('/', async(req, res)=>{
   try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ message: 'Usuário criado', usuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

//get
router.get('/', async(req, res)=>{
    const usuario = await Usuario.findAll();
    res.json(usuario)
})

//update
router.put('/', async(req, res)=>{
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    await usuario.update(req.body);
    res.json({ message: 'Usuário atualizado com sucesso', usuario });
})

//delete
router.delete('/:id', async(req, res)=>{
    const usuario = await Usuario.findByPk(req.params.id);
    await usuario.destroy()
});

module.exports = router;