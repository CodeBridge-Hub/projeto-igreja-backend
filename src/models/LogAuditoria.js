import { DataTypes } from "sequelize";

export default (sequelize) => {
  // Model LogAuditoria
  const LogAuditoria = sequelize.define(
    "LogAuditoria",
    {
      // --- COLUNAS ---
      id_log: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // id_usuario será criado automaticamente pela Associação (FK)

      data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // DEFAULT current_timestamp
      },
      acao: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dados_alterados: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuario", // nome da tabela de usuários
          key: "id_usuario",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      // --- OPÇÕES DO MODEL ---
      tableName: "log_auditoria",
      timestamps: false,
      indexes: [
        {
          name: "fk_log_usuari_idx",
          fields: ["id_usuario"],
        },
      ],
    }
  );

  return LogAuditoria;
};
