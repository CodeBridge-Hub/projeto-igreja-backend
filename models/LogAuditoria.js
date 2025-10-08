const { DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {
    // Model LogAuditoria
    const LogAuditoria = sequelize.define('LogAuditoria', {
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
            defaultValue: DataTypes.NOW // DEFAULT current_timestamp
        },
        acao: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dados_alterados: {
            type: DataTypes.TEXT,
            allowNull: true
        },

    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'log_auditoria',
        timestamps: false,
    });

    return LogAuditoria;
}