// src/services/pacienteService.js

/**
 * Processa e simula o salvamento de cadastro de Paciente/Responsável.
 * Assume que os dados já foram validados pelo Controller.
 * @param {object} dadosCadastro - Dados limpos e validados recebidos.
 */
const processarESalvarCadastro = async (dadosCadastro) => {
    // Nesta versão, a lógica de checagem de CPF duplicado e a inserção no BD
    // estão simuladas, pois o PostgreSQL ainda não está configurado.

    console.log('SIMULAÇÃO: Dados validados e prontos para salvar. (BD Offline)');

    // Prepara o objeto que seria retornado pelo banco de dados (Simulação de sucesso)
    const novoRegistro = {
        id: Math.floor(Math.random() * 1000) + 1,
        data_criacao: new Date().toISOString(),
        ...dadosCadastro,
    };

    // Aqui, em um projeto real, você faria:
    // const novoRegistro = await PacienteModel.create(dadosParaSalvar);
    
    return novoRegistro;
};

module.exports = {
    processarESalvarCadastro
};