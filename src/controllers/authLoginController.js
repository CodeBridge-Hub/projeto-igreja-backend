const authLoginService = require('../services/authLoginService');

// Lógica para Login
const login = async (req, res) => {
    // O frontend pode enviar cpf_ou_email para login
    const { cpf_ou_email, senha } = req.body; 
    
    if (!cpf_ou_email || !senha) {
        return res.status(400).json({ erro: 'CPF/E-mail e senha são obrigatórios.' });
    }

    try {
        // Chama a lógica de autenticação REAL do Service
        const resultado = await authService.autenticarUsuario(cpf_ou_email, senha);

        // Sucesso
        return res.status(200).json({ 
            mensagem: 'Login efetuado com sucesso!',
            token: resultado.token,
            usuario: resultado.usuario
        });

    } catch (error) {
        // Captura erros de credenciais
        if (error.message === 'Usuário não encontrado.' || error.message === 'Senha inválida.') {
            return res.status(401).json({ erro: 'Credenciais inválidas.' }); 
        }
        console.error('Erro no login (real):', error);
        return res.status(500).json({ erro: 'Falha interna do servidor.' });
    }
};

// Lógica para Recuperação de Senha
const recuperarSenha = async (req, res) => {
    const { cpf_ou_email } = req.body;

    if (!cpf_ou_email) {
        return res.status(400).json({ erro: 'CPF ou E-mail é obrigatório para recuperação.' });
    }

    try {
        // Chama a lógica de recuperação (busca e geração de token)
        const resultado = await authService.iniciarRecuperacaoDeSenha(cpf_ou_email);
        
        // Retorna sucesso (mensagem genérica para segurança)
        return res.status(200).json({ 
            mensagem: resultado.mensagem
        });

    } catch (error) {
        console.error('Erro na recuperação de senha (real):', error);
        return res.status(500).json({ erro: 'Falha interna do servidor.' });
    }
};

module.exports = {
    login,
    recuperarSenha,
};