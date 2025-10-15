import express from 'express';

// Importando apenas as funções necessárias de cada controller
import { 
    criarCadastro, 
    atualizarEndereco, 
    atualizarOcupacao 
} from '../controllers/pacientesController.js';

import { 
    finalizarCadastroComSenha 
} from '../controllers/cadastroFinalController.js';

// Importando as regras de validação
import { 
    CadastroValidacao,
    EnderecoValidacao,
    OcupacaoValidacao
} from '../middleware/pacienteValidation.js';

const router = express.Router();

// 1. ROTA DE CRIAÇÃO (TELA 1: Dados Pessoais)
router.post('/',
    CadastroValidacao,
    criarCadastro // Usa a função importada diretamente
);

// 2. ROTA DE ATUALIZAÇÃO DE ENDEREÇO (TELA 2)
router.patch('/:id/endereco', 
    EnderecoValidacao, 
    atualizarEndereco // Usa a função importada diretamente
);

// 3. ROTA DE ATUALIZAÇÃO DE OCUPAÇÃO (TELA 3)
router.patch('/:id/ocupacao', 
    OcupacaoValidacao, 
    atualizarOcupacao // Usa a função importada diretamente
);

// 4. Rota de Finalização/Criação de Senha (TELA 4)
router.patch('/finalizar-cadastro', 
    finalizarCadastroComSenha // Usa a função importada diretamente
);

export default router;