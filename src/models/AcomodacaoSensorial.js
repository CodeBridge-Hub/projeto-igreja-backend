import { DataTypes } from 'sequelize';

export default (sequelize) => {
    // Model Acomodação Sensorial
    const AcomodacaoSensorial = sequelize.define('AcomodacaoSensorial', {
        // --- COLUNAS ---
        id_acomo_sensorial: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // id_paciente_crianca será criado automaticamente pela Associação (FK)

        nome_crianca: {
            type: DataTypes.STRING(130),
            allowNull: true,
        },
        nome_mae_responsavel: {
            type: DataTypes.STRING(130),
            allowNull: true
        },
        telefone_contato: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        diagnostico: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        alergias: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        verbal: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        reforcador_positivo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        reforcador_negativo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        observacoes_adicionais: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        encaminhando_clinica_parceira: {
            type: DataTypes.STRING(120),
            allowNull: true
        },

    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'acomodacao_sensorial',
        timestamps: false,
        indexes: [
        {
            name: 'fk_acomodacao_paciente',
            fields: ['id_paciente_crianca']
        }
    ]
    });

    return AcomodacaoSensorial;
};