import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Servico = sequelize.define(
    "servico",
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
      tableName: "servico",
      schema: "servicos",
      timestamps: false,
    }
  );

  return Servico;
};
