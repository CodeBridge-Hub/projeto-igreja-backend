import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import PessoaModel from '../src/models/Pessoa.js';
import EnderecoModel from '../src/models/Endereco.js';
import ResponsavelModel from '../src/models/Responsavel.js';
import UsuarioModel from '../src/models/Usuario.js'
import AtendimentoModel from '../src/models/Atendimento.js'
import LogAuditoriaModel from '../src/models/LogAuditoria.js'

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false
  }
);

export const connectToDatabase = async () => {
  try {
    console.log("1. Conectando ao banco de dados...");
    await sequelize.authenticate();
    console.log("2. Conexão com Sequelize ao banco de dados estabelecida.");

    const Endereco = EnderecoModel(sequelize);
    const Responsavel = ResponsavelModel(sequelize);
    const Pessoa = PessoaModel(sequelize);
    const Usuario = UsuarioModel(sequelize);
    const Atendimento = AtendimentoModel(sequelize);
    const LogAuditoria = LogAuditoriaModel(sequelize);


    await sequelize.sync({ alter: true });
    console.log("3. Modelos sincronizados com sucesso.");
  } catch (error) {
    console.error('ERRO CRÍTICO na conexão ou sincronização do BD:', error);
    process.exit(1);
  }
};
