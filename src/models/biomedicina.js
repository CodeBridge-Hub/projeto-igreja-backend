const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Biomedicina = sequelize.define('Biomedicina', {
     id_biomedicina: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Paciente', // nome da tabela referenciada
      key: 'id_paciente'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  data_hora_atendimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  profissional_responsavel: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  status_atendimento: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  }

},{
    tableName: 'biomedicina',
    timestamps: false,
    indexes: [
        {
            name: 'fk_biomedicina_paciente_idx',
            fields: ['id_paciente']
        }
    ]
})

module.exports = Biomedicina