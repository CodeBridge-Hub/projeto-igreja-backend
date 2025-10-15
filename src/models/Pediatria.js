import { DataTypes } from 'sequelize';

export default (sequelize) => {
    //Model Pediatria
    const Pediatria = sequelize.define('Pediatria', {
        // --- COLUNAS ---
        id_pediatria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // id_paciente será criado pela Associação

        data_hora_consulta: {
            type: DataTypes.DATE,
            allowNull: true
        },
        profissional_responsavel: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        peso: {
            type: DataTypes.DECIMAL(6, 2), // DECIMAL(6,2): 6 dígitos no total, 2 após a vírgula
            allowNull: true
        },
        altura: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true
        },
        sinais_vitais: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        queixa_principal: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        observacoes_clinicas: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_atendimento: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'pediatria',
        timestamps: false,
        indexes: [
        {
            name: 'fk_pediatria_paciente_idx',
            fields: ['id_paciente']
        }
    ]
    });

    return Pediatria;
};