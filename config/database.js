import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import PessoaModel from "../src/models/pessoa.js";
import EnderecoModel from "../src/models/Endereco.js";
import ResponsavelModel from "../src/models/Responsavel.js";
import AtendimentoModel from "../src/models/atendimento.js";
import ServicoModel from "../src/models/servico.js";
import PacienteAtendimentoModel from "../src/models/paciente_atendimento.js";
import VoluntarioModel from "../src/models/Voluntario.js";
import DisponibilidadeModel from "../src/models/Disponibilidade.js";
import AreaAtuacaoModel from "../src/models/AreaAtuacao.js";
import UsuarioModel from "../src/models/usuario.js";
import SetorModel from "../src/models/setor.js"
import SetorServicoModel from "../src/models/setor_servico.js"

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT || 5432,
  logging: false,
  
  dialectOptions: {
      searchPath: ["pacientes", "administrativo", "estoque", "voluntariado", "servicos"],
    },
});

export const Endereco = EnderecoModel(sequelize);
export const Responsavel = ResponsavelModel(sequelize);
export const Pessoa = PessoaModel(sequelize);
export const Voluntario = VoluntarioModel(sequelize);
export const Disponibilidade = DisponibilidadeModel(sequelize);
export const AreaAtuacao = AreaAtuacaoModel(sequelize);
export const Usuario = UsuarioModel(sequelize);
export const Atendimento = AtendimentoModel(sequelize);
export const Servico = ServicoModel(sequelize); 
export const PacienteAtendimento = PacienteAtendimentoModel(sequelize);
export const Setor = SetorModel(sequelize)
export const SetorServico = SetorServicoModel(sequelize)

Atendimento.belongsTo(Pessoa, { foreignKey: "id_paciente", as: "paciente" });
Atendimento.belongsTo(Servico, { foreignKey: "id_servico", as: "servico" });

Atendimento.belongsTo(Setor, {
  foreignKey: "id_setor",
  as: "setor",
});

// Um setor pode ter vários atendimentos
Setor.hasMany(Atendimento, {
  foreignKey: "id_setor",
  as: "atendimentos",
});

Setor.belongsToMany(Servico, {
  through: SetorServico,
  foreignKey: "id_setor",
  otherKey: "id_servico",
  as: "servicos",
});

Servico.belongsToMany(Setor, {
  through: SetorServico,
  foreignKey: "id_servico",
  otherKey: "id_setor",
  as: "setores",
});

Pessoa.belongsToMany(Atendimento, {
  through: PacienteAtendimento,
  foreignKey: "paciente_id",
  otherKey: "atendimento_id",
  as: "atendimentos",
});

Atendimento.belongsToMany(Pessoa, {
  through: PacienteAtendimento,
  foreignKey: "atendimento_id",
  otherKey: "paciente_id",
  as: "pacientes",
});

SetorServico.belongsTo(Setor, { foreignKey: "id_setor", as: "setor" });

// Permite que o SetorServico faça include do Servico (opcional)
SetorServico.belongsTo(Servico, { foreignKey: "id_servico", as: "servico" });

export const connectToDatabase = async () => {
  try {
    console.log("1. Conectando ao banco de dados...");
    await sequelize.authenticate();
    console.log("2. Conexão com Sequelize ao banco de dados estabelecida.");

    await sequelize.sync({ alter: true });
    console.log("3. Modelos sincronizados com sucesso.");
  } catch (error) {
    console.error("ERRO CRÍTICO na conexão ou sincronização do BD:", error);
    process.exit(1);
  }
};
