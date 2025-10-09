const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    //Model Nutrição
    const Nutricao = sequelize.define('Nutricao', {
        // --- COLUNAS ---
        id_nutricao: {
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
        anamnese_nutricional: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avaliacao_fisica_bioquimica: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        plano_alimentar_personalizado: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true
        },

    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'nutricao',
        timestamps: false,
    });

    return Nutricao;
};