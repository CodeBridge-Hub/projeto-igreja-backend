const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    // Model Juridico
    const Juridico = sequelize.define('Juridico', {
        // --- COLUNAS ---
        id_juridico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // id_paciente será criado automaticamente pela Associação (FK)

        data_hora_atendimento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        profissional_responsavel: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        observacoes_caso: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dados_exportados_pdf: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },

    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'juridico',
        timestamps: false,
    });

    return Juridico;
};