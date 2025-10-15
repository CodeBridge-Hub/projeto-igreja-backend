import { DataTypes } from 'sequelize';

export default (sequelize) => {
    // Model Psicologia
    const Psicologia = sequelize.define('Psicologia', {
        // --- COLUNAS ---
        id_psicologia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // id_paciente será criado automaticamente pela Associação

        data_hora_atendimento: {
            type: DataTypes.DATE, // Mapeia o DATETIME do SQL (inclui data e hora)
            allowNull: false
        },
        profissional_responsavel: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        tipo_atendimento: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        observacoes_sessao: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_atendimento: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'psicologia',
        timestamps: false,
        indexes: [
        {
            name: 'fk_psicologia_paciente_idx',
            fields: ['id_paciente']
        }
    ]
    });

    return Psicologia;
};