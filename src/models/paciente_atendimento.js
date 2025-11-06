import { DataTypes } from "sequelize";

export default (sequelize) => {
  const PacienteAtendimento = sequelize.define(
    "paciente_atendimento",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "pessoa",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      atendimento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "atendimento",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "paciente_atendimento",
      schema: "pacientes",
      timestamps: true, // created_at e updated_at
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return PacienteAtendimento;
};
