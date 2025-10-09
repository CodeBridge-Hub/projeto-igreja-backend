const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // ajuste o caminho conforme seu projeto

const Atendimento = sequelize.define('Atendimento', {
  id_atendimento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_pessoa: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    // references: {
    //   model: 'paciente', // nome da tabela referenciada
    //   key: 'id_pessoa'
    // },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  tipo_servico: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cod_senha: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status_atendimento: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'Atendimento',  // nome exato da tabela
  timestamps: false,         // não cria createdAt e updatedAt
  indexes: [
    {
      name: 'fk_atendimento_pessoa_idx',
      fields: ['id_pessoa']
    }
  ]
});

module.exports = Atendimento;


//const Paciente = require('./Paciente'); // do modelo Paciente

// Atendimento.belongsTo(Paciente, {
//   foreignKey: 'id_pessoa',
//   as: 'paciente',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });
