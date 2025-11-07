import { DataTypes } from 'sequelize';

const DIAS_SEMANA = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

export default (sequelize) => {
  const Disponibilidade = sequelize.define('Disponibilidade', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dia_da_semana: {
      type: DataTypes.ENUM(...DIAS_SEMANA),
      allowNull: false,
    }
  }, {
    tableName: 'disponibilidades',
    timestamps: false
  });

  Disponibilidade.associate = (models) => {
    Disponibilidade.belongsToMany(models.Voluntario, {
      through: models.VoluntarioDisponibilidade,
      foreignKey: 'id_disponibilidade',
      otherKey: 'id_voluntario'
    });
  };

  return Disponibilidade;
};