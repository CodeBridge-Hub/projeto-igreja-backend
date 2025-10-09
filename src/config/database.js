require('dotenv').config();
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');


// Instância do Sequelize
const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASS,
   {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false
   }
);

// --- 1. IMPORTAÇÃO E INICIALIZAÇÃO DOS MODELOS ---

// Modelos Base e Segurança
const PessoaModel = require('../models/pessoa')(sequelize); 
const EnderecoModel = require('../models/Endereco')(sequelize); 
const ResponsavelModel = require('../models/responsavel')(sequelize);
const UsuarioModel = require('../models/usuario')(sequelize); 
const LogAuditoriaModel = require('../models/LogAuditoria')(sequelize); 
const AtendimentoModel = require('../models/atendimento')(sequelize); 
const EncaminhamentoModel = require('../models/Encaminhamento')(sequelize);

// Modelos de Especialidade
const AcomodacaoModel = require('../models/AcomodacaoSensorial')(sequelize);
const JuridicoModel = require('../models/Juridico')(sequelize);
const MedicoGeralModel = require('../models/MedicoGeral')(sequelize);
const NutricaoModel = require('../models/Nutricao')(sequelize);
const OdontologiaModel = require('../models/Odontologia')(sequelize);
const PediatriaModel = require('../models/Pediatria')(sequelize);
const PsicologiaModel = require('../models/Psicologia')(sequelize);


// --- 2. DEFINIÇÃO DE ASSOCIAÇÕES (Relacionamentos) ---
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
      const connection  = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS
      });

      console.log("2. Conexão com o servidor MySQL estabelecida.");
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await connection.end();
      console.log(`3. Banco de dados '${process.env.DB_NAME}' criado ou verificado.`);

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
module.exports = {
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