const express = require('express');
const router = express.Router();
const Biomedicina = require('../models/biomedicina')

router.post('/', async(req, res)=>{
   try {
    const biomedicina = await Biomedicina.create(req.body);
    res.status(201).json({ message: 'Usuário criado', biomedicina });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

//get
router.get('/', async(req, res)=>{
    const biomedicina = await Biomedicina.findAll();
    res.json(biomedicina)
})

//update
router.put('/', async(req, res)=>{
    const biomedicina = await Biomedicina.findByPk(req.params.id)
    if (!biomedicina) return res.status(404).json({ message: 'Usuário não encontrado' });

    await biomedicina.update(req.body);
    res.json({ message: 'Usuário atualizado com sucesso', biomedicina });
})

//delete
router.delete('/:id', async(req, res)=>{
    const biomedicina = await Biomedicina.findByPk(req.params.id);
    await biomedicina.destroy()
});

module.exports = router;