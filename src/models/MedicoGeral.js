import { DataTypes } from 'sequelize';

export default (sequelize) => {
    // Model Medico Geral
    const MedicoGeral = sequelize.define('MedicoGeral', {
        // --- COLUNAS ---
        id_medico_geral: {
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
        queixa_principal: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sinais_vitais: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        diagnostico_hipoteses: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        evolucao_paciente: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        prescricao_medicamentos_terapias: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_atendimento: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        encaminhamento: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'medico_geral',
        timestamps: false,
        indexes: [
        {
            name: 'fk_medico_geral_paciente_idx',
            fields: ['id_paciente']
        }
    ]
    });

    return MedicoGeral;
};