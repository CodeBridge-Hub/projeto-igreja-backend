import { DataTypes } from "sequelize";

export default (sequelize) => {
  const SetorServico = sequelize.define(
    "setor_servico",
    {
      id_setor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: { tableName: "setor", schema: "servicos" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      id_servico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: { tableName: "servico", schema: "servicos" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "setor_servico",
      schema: "servicos",
      timestamps: false,
    }
  );

  return SetorServico;
};
