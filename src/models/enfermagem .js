const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enfermagem = sequelize.define('Enfermagem', {
    id_enfermagem:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    id_paciente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
         type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'Paciente', // Nome da tabela referenciada
        key: 'id_paciente'
    },  onDelete: 'CASCADE',
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
  pressao_arterial: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  peso: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: true
  },
  altura: {
    type: DataTypes.DECIMAL(4,2),
    allowNull: true
  },
  temperatura: {
    type: DataTypes.DECIMAL(4,2),
    allowNull: true
  },
  frequencia_cardiaca: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  glicemia: {
    type: DataTypes.DECIMAL(6,2),
    allowNull: true
  },
  prioridade_manchester: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  status_atendimento: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
})

module.exports = Enfermagem