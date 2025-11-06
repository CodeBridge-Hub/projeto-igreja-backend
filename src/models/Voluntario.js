import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Voluntario = sequelize.define(
    'Voluntario',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome_completo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      data_de_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [11, 11],
        },
      },
      telefone_whatsapp: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
    },
    {
      tableName: 'voluntarios',
      timestamps: true,
    }
  );

  Voluntario.associate = (models) => {
    Voluntario.belongsToMany(models.Disponibilidade, {
      through: models.VoluntarioDisponibilidade,
      foreignKey: 'id_voluntario',
      otherKey: 'id_disponibilidade',
      onDelete: 'CASCADE',
    });

    Voluntario.belongsToMany(models.AreaAtuacao, {
      through: models.VoluntarioAreaAtuacao,
      foreignKey: 'id_voluntario',
      otherKey: 'id_area_atuacao',
      onDelete: 'CASCADE',
    });
  };

  return Voluntario;
};