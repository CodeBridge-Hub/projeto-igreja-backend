const { sequelize, PessoaModel, EnderecoModel, ResponsavelModel } = require('../config/database'); 

const processarESalvarCadastro = async (dadosCadastro) => {
    
    // Mapeamento e Preparação de Dados
    
    // Dados para EnderecoModel
    const dadosEndereco = {
        rua: dadosCadastro.endereco_completo,
        cep: dadosCadastro.cep,
        bairro: dadosCadastro.bairro,
        numero: dadosCadastro.numero_residencia,
        // Incluir cidade e estado se necessário
    };

    const dadosResponsavel = {
        nome_responsavel: dadosCadastro.nome_responsavel,
        cpf_responsavel: dadosCadastro.cpf_responsavel ? dadosCadastro.cpf_responsavel.replace(/[^\d]/g, '') : null,
        telefone: dadosCadastro.telefone_responsavel ? dadosCadastro.telefone_responsavel.replace(/[^\d]/g, '') : null,
        parentesco: dadosCadastro.parentesco,
    };

    // Verifica a condição de criação do Responsável (se vier nome E CPF)
    const temDadosResponsavel = dadosResponsavel.nome_responsavel && dadosResponsavel.cpf_responsavel;

    const dadosPessoa = {
        nome: dadosCadastro.nome_completo,
        data_nascimento: dadosCadastro.data_nascimento,
        cpf: dadosCadastro.cpf, 
        sexo: dadosCadastro.sexo,
        telefone_contato: dadosCadastro.telefone,
        // Conversão explícita para BOOLEAN
        possui_deficiencia: dadosCadastro.deficiencia === 'Sim', 
        tipo_deficiencia: dadosCadastro.qual_deficiencia,
        // Conversão de array/objeto para TEXTO JSON
        condicoes_pre_existentes: JSON.stringify(dadosCadastro.condicoes_pre_existentes || []),
        // id_endereco e id_responsavel serão injetados durante a transação
    };
    
    let novoRegistroPessoa = null;

    // INSERÇÃO DENTRO DE UMA TRANSAÇÃO
    try {
        await sequelize.transaction(async (t) => {
            
            // A) INSERIR ENDEREÇO
            const novoEndereco = await EnderecoModel.create(dadosEndereco, { transaction: t });

            // B) INSERIR RESPONSÁVEL (Condicional)
            let novoResponsavel = null;
            if (temDadosResponsavel) {
                novoResponsavel = await ResponsavelModel.create(dadosResponsavel, { transaction: t });
                dadosPessoa.id_responsavel = novoResponsavel.id_responsavel; // Liga a FK
            } else {
                dadosPessoa.id_responsavel = null;
            }

            // C) INSERIR PESSOA (Ligando as chaves criadas)
            dadosPessoa.id_endereco = novoEndereco.id_endereco;
            
            novoRegistroPessoa = await PessoaModel.create(dadosPessoa, { transaction: t });

        }); 
        
        return novoRegistroPessoa;

    } catch (error) {
        console.error('Erro ao salvar o cadastro no BD:', error);
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Já existe um cadastro com este CPF. Verifique os dados.');
        }
        
        throw new Error('Falha na criação do cadastro: ' + error.message);
    }
};

module.exports = {
    processarESalvarCadastro
};