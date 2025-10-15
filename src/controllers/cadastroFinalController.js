import bcrypt from 'bcryptjs';

const finalizarCadastroComSenha = async (req, res) => {
    // ID do paciente e a senha vêm do frontend.
    const { paciente_id, senha } = req.body;

    // Validação básica (o ideal é ter um middleware, mas simplificamos aqui)
    if (!paciente_id || !senha) {
        return res.status(400).json({ erro: 'ID do paciente e senha são obrigatórios.' });
    }

    const complexidadeRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!complexidadeRegex.test(senha)) {
        return res.status(400).json({ 
            erro: 'A senha deve ter no mínimo 8 caracteres e incluir pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.'
        });
    }

    try{
        // --- SIMULAÇÃO DE LÓGICA DE BANCO DE DADOS ---

        // 1. Simulação da Criptografia (Obrigatório, mesmo na simulação!
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        console.log(`SIMULAÇÃO: Senha recebida: ${senha}`);
        console.log(`SIMULAÇÃO: Senha criptografada (Hash): ${senhaHash}`);

        // 2. Simulação da Criação do Usuário (Logável)
        const novoUsuarioSimulado = {
            usuario_id: paciente_id,
            cpf_login: '999.888.777-66',
            papel: 'Paciente',
            data_criacao: new Date().toISOString()
        };

        // 3. Retorna sucesso
        return res.status(201).json({
            mensagem: 'Cadastro de senha finalizado com sucesso. Prossiga para a tela final.',
            usuario_criado: novoUsuarioSimulado,
            proximo_passo: 'O usuário agora pode logar com o CPF simulado e a senha fornecida.'
        });

    } catch (error) {
        console.error('Erro ao finalizar cadastro (Simulação):', error);
        return res.status(500).json({ erro: 'Falha interna do servidor.' });
    }
};

export {
    finalizarCadastroComSenha,
};