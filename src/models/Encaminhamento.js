import { DataTypes } from 'sequelize';

export default (sequelize) => {
    // Model Encaminhamento
    const Encaminhamento = sequelize.define('Encaminhamento', {
        // --- COLUNAS ---
        id_encaminhamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // id_paciente será criado automaticamente pela Associação (FK)

        setor_origem: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        setor_destino: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        data_encaminhamento: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW // Adiciona 'DEFAULT current_timestamp'
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        motivo: {
            type: DataTypes.TEXT,
            allowNull: true
        },

    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'encaminhamento',
        timestamps: false,
        indexes: [
            {
            name: 'fk_encaminhamento_paciente_idx',
            fields: ['id_paciente']
            }
        ]
    });

    return Encaminhamento;
};