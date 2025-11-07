import { DataTypes } from 'sequelize';


export default (sequelize) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [11, 11]
        }
      },
      setor: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      tableName: 'usuario',
      schema: 'administrativo',
      timestamps: false,
    }
  );

  return Usuario;
};