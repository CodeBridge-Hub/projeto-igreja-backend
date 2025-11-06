import {Usuario} from '../../config/database.js'; 

export const seedUsuarios = async () => {
  const count = await Usuario.count();
  if (count > 0) {
    console.log("Usuários já existem, seed ignorado.");
    return;
  }

  await Usuario.bulkCreate([
  { nome: "AdminUser", email: "admin@example.com", senha: "admin123", cpf: "11111111111", setor: "Administração", role: "ADMIN" },
  { nome: "User1", email: "user1@example.com", senha: "user123", cpf: "22222222222", setor: "Comunicação", role: "USER" },
  { nome: "User2", email: "user2@example.com", senha: "user123", cpf: "33333333333", setor: "Financeiro", role: "USER" },
  { nome: "User3", email: "user3@example.com", senha: "user123", cpf: "44444444444", setor: "Educação", role: "USER" },
  { nome: "User4", email: "user4@example.com", senha: "user123", cpf: "55555555555", setor: "Eventos", role: "USER" },
  { nome: "User5", email: "user5@example.com", senha: "user123", cpf: "66666666666", setor: "Música", role: "USER" },
  { nome: "User6", email: "user6@example.com", senha: "user123", cpf: "77777777777", setor: "Voluntariado", role: "USER" },
  { nome: "User7", email: "user7@example.com", senha: "user123", cpf: "88888888888", setor: "Infraestrutura", role: "USER" },
  { nome: "User8", email: "user8@example.com", senha: "user123", cpf: "99999999999", setor: "Recepção", role: "USER" },
  { nome: "User9", email: "user9@example.com", senha: "user123", cpf: "10101010101", setor: "Assistência Social", role: "USER" },
  { nome: "User10", email: "user10@example.com", senha: "user123", cpf: "12121212121", setor: "Comunidade", role: "USER" }
]);


  console.log("Usuários iniciais criados com sucesso!");
};
