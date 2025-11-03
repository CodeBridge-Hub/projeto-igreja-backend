import {Usuario} from '../../config/database.js'; 

export const seedUsuarios = async () => {
  const count = await Usuario.count();
  if (count > 0) {
    console.log("Usuários já existem, seed ignorado.");
    return;
  }

  await Usuario.bulkCreate([
    { nome_usuario: "AdminUser", email: "admin@example.com", senha: "admin123", setor: "Administração", permissao_acesso: "ADMIN" },
    { nome_usuario: "User1", email: "user1@example.com", senha: "user123", setor: "Comunicação", permissao_acesso: "USER" },
    { nome_usuario: "User2", email: "user2@example.com", senha: "user123", setor: "Financeiro", permissao_acesso: "USER" },
    { nome_usuario: "User3", email: "user3@example.com", senha: "user123", setor: "Educação", permissao_acesso: "USER" },
    { nome_usuario: "User4", email: "user4@example.com", senha: "user123", setor: "Eventos", permissao_acesso: "USER" },
    { nome_usuario: "User5", email: "user5@example.com", senha: "user123", setor: "Música", permissao_acesso: "USER" },
    { nome_usuario: "User6", email: "user6@example.com", senha: "user123", setor: "Voluntariado", permissao_acesso: "USER" },
    { nome_usuario: "User7", email: "user7@example.com", senha: "user123", setor: "Infraestrutura", permissao_acesso: "USER" },
    { nome_usuario: "User8", email: "user8@example.com", senha: "user123", setor: "Recepção", permissao_acesso: "USER" },
    { nome_usuario: "User9", email: "user9@example.com", senha: "user123", setor: "Assistência Social", permissao_acesso: "USER" },
    { nome_usuario: "User10", email: "user10@example.com", senha: "user123", setor: "Comunidade", permissao_acesso: "USER" }
  ]);

  console.log("Usuários iniciais criados com sucesso!");
};
