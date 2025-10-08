const express = require('express');
const router = express.Router();
const Atendimento = require('../models/atendimento');

router.post('/', async(req, res)=>{
    const atendimento = await Atendimento.create(req.body);
    res.json({message: 'Atendimento feito', atendimento})

});

//get
router.get('/', async(req, res)=>{
    const atendimentos = await Atendimento.findAll();
    res.json(atendimentos)
})

//update
router.put('/', async(req, res)=>{
    const atendimento = await Atendimento.findByPk(req.params.id)
    await atendimento.update(req.body)
})

//delete
router.delete('/:id', async(req, res)=>{
    const atendimento = await findByPk(req.params.id);
    await atendimento.destroy()
});

module.exports = router;