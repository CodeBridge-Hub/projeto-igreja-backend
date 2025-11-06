import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Atendimento = sequelize.define(
    "atendimento",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "pessoa",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      id_servico: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "servico",
            schema: "servicos",
          },
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      cod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("aguardando", "chamado", "em_atendimento", "finalizado"),
        defaultValue: "aguardando",
        allowNull: false,
      },
    },
    {
      tableName: "atendimento",
      schema: "pacientes",
      timestamps: true, // ativa createdAt e updatedAt automaticamente
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          name: "fk_atendimento_pessoa_idx",
          fields: ["id_paciente"],
        },
        {
          name: "fk_atendimento_servico_idx",
          fields: ["id_servico"],
        },
      ],
    }
  );

  return Atendimento;
};
