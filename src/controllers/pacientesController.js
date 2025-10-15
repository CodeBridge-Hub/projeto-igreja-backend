import { validationResult } from 'express-validator'; // Importa a função de erro
import pacienteService from '../services/pacienteService.js';

// Função principal de CRIAÇÃO (TELA 1 - Dados Pessoais)
const criarCadastro = async (req, res) => {
    //Verificar erros de validação
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        // Se houver erros, retorna 400 (Bad Request) com os detalhes
        return res.status(400).json({ erros: erros.array() });
    }

    // Se a requisição passou na validação, continua com a lógica do Service
    const dadosCadastro = req.body;

    try {
        const novoPaciente = await pacienteService.processarESalvarCadastro(dadosCadastro)

        return res.status(201).json({
            mensagem: "Cadastro reslizado com sucesso!",
            paciente: novoPaciente
        });
    } catch (error) {
        console.error('Erro ao processar cadastro:', error);
        return res.status(500).json({
            erro: 'Falha no servidor ao criar o cadastro.',
            detalhes: error.message
        });
    }
};

//Função para ATUALIZAR ENDEREÇO (TELA 2 - Endereço)
const atualizarEndereco = async (req, res) => {
    const { id } = req.params; // Captura o ID da URL
    
    // 1. Verificar erros de validação ESTRITA de endereço
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    // 2. Lógica para atualizar no Service (Será PATCH no BD)
    try {
        // Você criará a função pacienteService.atualizarEndereco(id, req.body)
        // Por agora, apenas simule o sucesso
        console.log(`SIMULAÇÃO: Atualizando endereço para ID: ${id}`);
        
        return res.status(200).json({ 
            mensagem: 'Endereço atualizado com sucesso.',
            paciente_id: id 
        });

    } catch (error) {
        return res.status(500).json({ erro: 'Falha ao atualizar endereço.' });
    }
};

//Função para ATUALIZAR OCUPAÇÃO (TELA 3 - Dados de Ocupação)
const atualizarOcupacao = async (req, res) => {
    const { id } = req.params; 

    // 1. Verificar erros de validação ESTRITA de ocupação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    // 2. Lógica para atualizar no Service
    try {
        // Você criará a função pacienteService.atualizarOcupacao(id, req.body)
        // Por agora, apenas simule o sucesso
        console.log(`SIMULAÇÃO: Atualizando ocupação para ID: ${id}`);

        return res.status(200).json({ 
            mensagem: 'Dados de Ocupação atualizados com sucesso.',
            paciente_id: id 
        });

    } catch (error) {
        return res.status(500).json({ erro: 'Falha ao atualizar ocupação.' });
    }
};

export {
    criarCadastro,
    atualizarEndereco,
    atualizarOcupacao
};