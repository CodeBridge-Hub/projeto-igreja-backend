import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const VoluntarioDisponibilidade = sequelize.define('VoluntarioDisponibilidade', {
    id_voluntario: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_disponibilidade: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    turno: {
      type: DataTypes.ENUM('matutino', 'vespertino', 'noturno'),
      allowNull: false
    }
  }, {
    tableName: 'voluntario_disponibilidade',
    timestamps: false
  });

  return VoluntarioDisponibilidade;
};