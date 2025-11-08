import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Setor = sequelize.define(
    "setor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "setor",
      schema: "servicos",
      timestamps: false,
    }
  );

  return Setor;
};
