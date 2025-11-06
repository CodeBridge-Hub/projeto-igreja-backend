import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import PessoaModel from "../src/models/pessoa.js";
import EnderecoModel from "../src/models/Endereco.js";
import ResponsavelModel from "../src/models/Responsavel.js";
import UsuarioModel from "../src/models/Usuario.js";
import AtendimentoModel from "../src/models/Atendimento.js";
import ServicoModel from "../src/models/servico.js";
import PacienteAtendimentoModel from "../src/models/paciente_atendimento.js";

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
export const Usuario = UsuarioModel(sequelize);
export const Atendimento = AtendimentoModel(sequelize);
export const Servico = ServicoModel(sequelize); 
export const PacienteAtendimento = PacienteAtendimentoModel(sequelize);

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
