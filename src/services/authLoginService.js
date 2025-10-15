import jwt from 'jsonwebtoken';
// Usamos 'import * as' para importar todas as exportações de um módulo em um único objeto,
// o que imita o comportamento do 'require' para módulos locais.
import * as emailService from './emailService.js';
// Importa uma exportação nomeada ('named export') do arquivo de configuração.
import { UsuarioModel } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET;
const TARGET_LOGIN_FIELD = 'nome_usuario'; // Campo de login na tabela 'usuario'

/**
 * Lógica central para autenticar um usuário e gerar um JWT.
 * @param {string} identificador - CPF ou E-mail (que será mapeado para nome_usuario).
 * @param {string} senha - A senha em texto puro fornecida pelo usuário.
 */
// Usamos 'export' na frente da declaração para exportar a função.
export const autenticarUsuario = async (identificador, senha) => {
    // Buscar usuário
    const usuario = await UsuarioModel.findOne({
        where: { [TARGET_LOGIN_FIELD]: identificador }
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    // Comparar a senha criptografada
    const senhaValida = usuario.validPassword(senha);

    if (!senhaValida) {
        throw new Error('Senha inválida.');
    }

    // Gerar o Token JWT
    const token = jwt.sign(
        {
            id: usuario.id_usuario, 
            papel: usuario.permissao_acesso,
            setor: usuario.setor
        },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    // Retorno de sucesso
    return {
        token,
        usuario: {
            id: usuario.id_usuario,
            nome: usuario.nome_usuario,
            papel: usuario.permissao_acesso,
        }
    };
};

/**
 * Lógica para recuperação de senha.
 */
export const iniciarRecuperacaoDeSenha = async (identificador) => {
    // Buscar usuário para confirmar existência
    const usuario = await UsuarioModel.findOne({
        where: { [TARGET_LOGIN_FIELD]: identificador }
    });

    if (usuario) {
        // Gerar token de recuperação
        const resetToken = jwt.sign(
            { id: usuario.id_usuario },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // --- PONTO DE INTEGRAÇÃO COM O SERVIÇO DE E-MAIL REAL ---
        try {
            await emailService.sendPasswordReset(
                usuario.nome_usuario, // Usado como e-mail de destino
                resetToken,
                usuario.nome_completo || usuario.nome_usuario // Passa o nome para o e-mail
            );
        } catch (emailError) {
            // Loga o erro, mas não retorna 500 para o cliente (LGPD)
            console.error('Falha no disparo de email SMTP:', emailError.message);
        }
    }

    // Retorna uma mensagem genérica por segurança
    return { mensagem: 'Se o usuário estiver cadastrado, um link de recuperação será enviado.' };
};