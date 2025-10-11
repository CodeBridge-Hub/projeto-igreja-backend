const nodemailer = require('nodemailer');

// 1. Configurações do transportador (SMTP)
// Ele usa as variáveis EMAIL_USER, EMAIL_PASS e EMAIL_SERVICE do arquivo .env.
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Envia o email de recuperação de senha para o usuário.
 * @param {string} toEmail - Email do destinatário.
 * @param {string} resetToken - Token de segurança gerado pelo backend.
 * @param {string} userName - Nome do usuário.
 */
const sendPasswordReset = async (toEmail, resetToken, userName) => {
    // 1. Cria o link de recuperação (URL do Front-end + Token)
    // O FRONTEND_URL vem do seu .env
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    // 2. Configuração do corpo do email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Sistema de Atendimento Integrado - Recuperação de Senha',
        html: `
            <h2>Olá, ${userName}!</h2>
            <p>Recebemos uma solicitação para redefinir a sua senha.</p>
            <p>Clique no link abaixo para criar uma nova senha:</p>
            <p><a href="${resetLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Redefinir Senha Agora</a></p>
            <p>Este link expira em 1 hora.</p>
            <p>Se você não solicitou esta redefinição, por favor, ignore este email.</p>
            <p style="font-size: 0.8em; color: #888;">(Link de segurança: ${resetLink})</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email de recuperação disparado com sucesso para: ${toEmail}`);
        return true;
    } catch (error) {
        // Loga o erro, mas não o propaga para o Controller para evitar erro 500 no cliente
        console.error('ERRO AO ENVIAR EMAIL (Nodemailer):', error);
        throw new Error('Falha no serviço de envio de email. Verifique as credenciais SMTP.'); 
    }
};

module.exports = {
    sendPasswordReset,
};