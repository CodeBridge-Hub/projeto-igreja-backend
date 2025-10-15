import 'dotenv/config';
import { Sequelize } from 'sequelize';
import pg from 'pg';
const { Client } = pg;


// --- 1. Modelos Independentes (Pais) ---
// Não dependem de nenhum outro modelo para serem criados.
import EnderecoModelFunc from '../models/Endereco.js'; 
import ResponsavelModelFunc from '../models/responsavel.js';
import UsuarioModelFunc from '../models/usuario.js'; 

// --- 2. Modelos Primários (Filhos diretos) ---
// Dependem diretamente dos modelos acima.
import PessoaModelFunc from '../models/pessoa.js'; 
import LogAuditoriaModelFunc from '../models/LogAuditoria.js'; 

// --- 3. Modelos de Atendimento e Especialidades ---
// Todos dependem do modelo 'Pessoa'.
import AtendimentoModelFunc from '../models/atendimento.js'; 
import EncaminhamentoModelFunc from '../models/Encaminhamento.js';
import AcomodacaoModelFunc from '../models/AcomodacaoSensorial.js';
import JuridicoModelFunc from '../models/Juridico.js';
import MedicoGeralModelFunc from '../models/MedicoGeral.js';
import NutricaoModelFunc from '../models/Nutricao.js';
import OdontologiaModelFunc from '../models/Odontologia.js';
import PediatriaModelFunc from '../models/Pediatria.js';
import PsicologiaModelFunc from '../models/Psicologia.js';

// Instância do Sequelize
const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASS,
   {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      logging: false
   }
);

// --- INICIALIZAÇÃO DOS MODELOS ---

// Carregando cada modelo chamando a função de exportação e passando a instância do Sequelize.
// 1. Inicializa os modelos "Pais"
const EnderecoModel = EnderecoModelFunc(sequelize); 
const ResponsavelModel = ResponsavelModelFunc(sequelize);
const UsuarioModel = UsuarioModelFunc(sequelize); 

// 2. Inicializa os modelos "Filhos" que dependem dos pais
const PessoaModel = PessoaModelFunc(sequelize); 
const LogAuditoriaModel = LogAuditoriaModelFunc(sequelize); 

// 3. Inicializa os modelos de atendimento que dependem de 'Pessoa'
const AtendimentoModel = AtendimentoModelFunc(sequelize); 
const EncaminhamentoModel = EncaminhamentoModelFunc(sequelize);
const AcomodacaoModel = AcomodacaoModelFunc(sequelize);
const JuridicoModel = JuridicoModelFunc(sequelize);
const MedicoGeralModel = MedicoGeralModelFunc(sequelize);
const NutricaoModel = NutricaoModelFunc(sequelize);
const OdontologiaModel = OdontologiaModelFunc(sequelize);
const PediatriaModel = PediatriaModelFunc(sequelize);
const PsicologiaModel = PsicologiaModelFunc(sequelize);

// --- DEFINIÇÃO DE ASSOCIAÇÕES (Relacionamentos) ---
// NOTA: Os IDs 'id_paciente' e 'id_pessoa' referenciam PessoaModel
const TARGET_KEY = 'id_pessoa'; 

// A. ASSOCIAÇÕES BASE
PessoaModel.belongsTo(EnderecoModel, { foreignKey: 'id_endereco', targetKey: 'id_endereco', onDelete: 'SET NULL', onUpdate: 'CASCADE'});
EnderecoModel.hasMany(PessoaModel, { foreignKey: 'id_endereco' });

PessoaModel.belongsTo(ResponsavelModel, { foreignKey: 'id_responsavel', targetKey: 'id_responsavel', onDelete: 'SET NULL', onUpdate: 'CASCADE'});
ResponsavelModel.hasMany(PessoaModel, { foreignKey: 'id_responsavel' });

// B. ASSOCIAÇÕES DE SEGURANÇA
LogAuditoriaModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuario', targetKey: 'id_usuario', onDelete: 'SET NULL', onUpdate: 'CASCADE'});
UsuarioModel.hasMany(LogAuditoriaModel, { foreignKey: 'id_usuario' });


// C. ASSOCIAÇÕES DE ATENDIMENTO E FLUXO (Todos se ligam à PessoaModel)
const atendimentoModels = [
   AtendimentoModel, EncaminhamentoModel, AcomodacaoModel, JuridicoModel, 
   MedicoGeralModel, NutricaoModel, OdontologiaModel, PediatriaModel, PsicologiaModel
];

atendimentoModels.forEach(Model => {
    // Todos os modelos de atendimento têm uma FK 'id_paciente' que aponta para a PK 'id_pessoa'
   Model.belongsTo(PessoaModel, { 
      foreignKey: 'id_paciente', 
      targetKey: TARGET_KEY,    
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE',
   });
   PessoaModel.hasMany(Model, { foreignKey: 'id_paciente' });
});


// --- 3. FUNÇÃO CENTRAL DE CONEXÃO E CRIAÇÃO DE TABELAS ---
const connectToDatabase = async () => {
   try {
      console.log("1. Lendo variáveis de ambiente...");
      
      // A) Conexão Temporária para Criar o Banco (usando mysql2)
      const client = new Client({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'postgres' // Conecta ao banco 'postgres' padrão para poder criar o seu
      });

      await client.connect();
      console.log("2. Conexão com o servidor PostgreSQL estabelecida.");

      const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
      if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
            console.log(`3. Banco de dados '${process.env.DB_NAME}' criado.`);
      } else {
            console.log(`3. Banco de dados '${process.env.DB_NAME}' verificado.`);
      }
      await client.end();

      // B) Autenticação do Sequelize e Sincronização
      await sequelize.authenticate();
      console.log("4. Conexão com Sequelize ao banco de dados estabelecida.");

      // C) CRIAÇÃO DAS TABELAS (Rodando todos os Models que foram importados)
      await sequelize.sync(); 
      console.log("5. Todos os modelos sincronizados (Tabelas criadas/atualizadas).");


   } catch (error) {
      console.error('ERRO CRÍTICO na conexão ou sincronização do BD: ', error);
      process.exit(1)
   }
}

// --- 4. Exportação dos Componentes ---
export {
   sequelize, 
   connectToDatabase, 
   
   // Exportamos todos os Models para uso nos Services
   PessoaModel, 
   EnderecoModel,
   ResponsavelModel,
   UsuarioModel,
   LogAuditoriaModel,
   AtendimentoModel,
   AcomodacaoModel,
   EncaminhamentoModel,
   JuridicoModel,
   MedicoGeralModel,
   NutricaoModel,
   OdontologiaModel,
   PediatriaModel,
   PsicologiaModel,
};