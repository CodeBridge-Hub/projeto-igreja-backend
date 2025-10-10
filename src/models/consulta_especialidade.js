const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Consulta_especialidade = sequelize.define('Consulta_especialidade', {
     id_consulta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },

     id_paciente: {
        types: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        references:{
            model: 'paciente',
            key: 'id_paciente'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
     },


     especialidade: {
        type: DataTypes.ENUM(
            'oftalmologia',
            'psicologia',
            'pediatria',
            'medico_geral',
            'odontologia',
            'juridico',
            'nutricao'
        ),

        allowNull: false
     },

     data_hora_consulta: {
    type: DataTypes.DATE,
    allowNull: false
  },
  profissional_responsavel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status_atendimento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  queixa_principal: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diagnostico_hipoteses: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  prescricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  encaminhamento: {
    type: DataTypes.STRING,
    allowNull: true
  },

  dados_exportados_pdf: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },

  //  atributos específicos
oft_refra_grau: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  oft_acuidade_visual_od: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  oft_acuidade_visual_oe: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  ped_peso: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  ped_altura: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true
  },
  ped_sinais_vitais: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  odo_servicos_atendidos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nut_anamnese: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nut_avaliacao_fisica: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nut_plano_alimentar: {
    type: DataTypes.TEXT,
    allowNull: true
  }

}, {
    tableName: 'Consulta_especialidade',
    timestamps: false,
    engine: 'innoDB',
    indexes: [
        { 
            name: 'fk_consulta_paciente_idx',
            fields: 'id_paciente'
        }
    ]
})  

module.exports = Consulta_especialidade