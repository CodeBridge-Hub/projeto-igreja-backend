const express = require('express');
const router = express.Router();
const Responsavel = require('../models/responsavel');

//create
router.post('/', async(req, res)=>{
    const responsavel = await Responsavel.create(req.body);
    res.json({message: 'Usuario criado', responsavel})

});

//get
router.get('/', async(req, res)=>{
    const responsaveis = await Responsavel.findAll();
    res.json(responsaveis)
})

//update
router.put('/', async(req, res)=>{
    const responsavel = await Responsavel.findByPk(req.params.id)
    await responsavel.update(req.body)
})

//delete
router.delete('/:id', async(req, res)=>{
    const responsavel = await findByPk(req.params.id);
    await responsavel.destroy()
});

module.exports = router;