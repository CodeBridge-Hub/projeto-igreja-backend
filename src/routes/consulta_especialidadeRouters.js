const express = require('express');
const router = express.Router();
const Consulta_especialidade = require('../models/consulta_especialidade');


router.post('/', async(req, res)=>{
   try {
    const consulta_especialidade = await Consulta_especialidade.create(req.body);
    res.status(201).json({ message: 'sucesso', Consulta_especialidade });
  } catch (error) {
    res.status(500).json({ message: 'erro', error: error.message });
  }
});

//get
router.get('/', async(req, res)=>{
    const consulta_especialidade = await Consulta_especialidade.findAll();
    res.json(consulta_especialidade)
})

//update
router.put('/', async(req, res)=>{
    const consulta_especialidade = await Consulta_especialidade.findByPk(req.params.id)
    if (!consulta_especialidade) return res.status(404).json({ message: 'erro' });

    await consulta_especialidade.update(req.body);
    res.json({ message: 'atualizado com sucesso', consulta_especialidade });
})

//delete
router.delete('/:id', async(req, res)=>{
    const consulta_especialidade = await Consulta_especialidade.findByPk(req.params.id);
    await consulta_especialidade.destroy()
});

module.exports = router;