import { DataTypes } from 'sequelize';

export default (sequelize) => {
const Oftalmologia = sequelize.define('Oftalmologia', {
  id_oftalmologia: {
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
  data_hora_consulta: {
    type: DataTypes.DATE,
    allowNull: false
  },
  profissional_responsavel: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  refra_grau: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  acuidade_visual_od: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  acuidade_visual_oe: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  prescricao_oculos_lentes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  prescricao_medicamentos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status_atendimento: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'oftalmologia',
  timestamps: false,
  indexes: [
    {
      name: 'fk_oftalmologia_paciente_idx',
      fields: ['id_paciente']
    }
  ]
});

return Oftalmologia;

}