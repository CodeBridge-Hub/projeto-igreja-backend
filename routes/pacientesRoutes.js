const express = require('express');
const router = express.Router();

const pacientesController = require('../controllers/pacientesController');
//Importa o array de regras
const { CadastroValidacao,
        EnderecoValidacao,
        OcupacaoValidacao
} = require('../middleware/pacienteValidation');

// Aplica o middleware de validação ANTES de chamar o Controller
// 1. ROTA DE CRIAÇÃO (TELA 1: Dados Pessoais)
// Usa a validação FLEXÍVEL
router.post('/',
    CadastroValidacao, // Executa todas as regras de validação
    pacientesController.criarCadastro
);

// 2. ROTA DE ATUALIZAÇÃO DE ENDEREÇO (TELA 2)
// Usa a validação ESTRITA de Endereço
router.patch('/:id/endereco', 
    EnderecoValidacao, 
    pacientesController.atualizarEndereco
);

// 3. ROTA DE ATUALIZAÇÃO DE OCUPAÇÃO (TELA 3)
// Usa a validação ESTRITA de Ocupação
router.patch('/:id/ocupacao', 
    OcupacaoValidacao, 
    pacientesController.atualizarOcupacao
);

// 4. Rota de Finalização/Criação de Senha (Criação de Senha - TELA 4)
// Usamos PATCH pois estamos atualizando o registro do paciente com a senha.
const cadastroFinalController = require('../controllers/cadastroFinalController');
router.patch('/finalizar-cadastro', cadastroFinalController.finalizarCadastroComSenha)

module.exports = router;