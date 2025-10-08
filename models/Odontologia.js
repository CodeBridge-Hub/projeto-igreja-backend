const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Model Odontologia
    const Odontologia = sequelize.define('Odontologia', {
        // --- COLUNAS ---
        id_odontologia: {
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
        servicos_atendidos: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        diagnostico_problema_dentario: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        servico_necessario_encaminhamento: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_atendimento: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        dados_exportados_pdf: {
            type: DataTypes.BLOB('long'), // Mapeia o BLOB do SQL, usado para armazenar grandes volumes de dados (como um PDF em formato binário)
            allowNull: true
        },
    }, {
        // --- OPÇÕES DO MODEL ---
        tableName: 'odontologia',
        timestamps: false,
    });

    return Odontologia;
};