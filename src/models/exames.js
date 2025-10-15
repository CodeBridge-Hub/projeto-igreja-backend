import { DataTypes } from 'sequelize';

export default (sequelize) => {
const Exames = sequelize.define('Exames', {
    id_exame:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    id_atendimento_biomedicina:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'atendimento',
            key: 'id_atendimento'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    tipo_exame:{
        type: DataTypes.STRING,
        allowNull: false,

    },

    resultado:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    sigiloso:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,

    },

    data_hora:{
        type: DataTypes.DATE,
        allowNull: false,

    },
    responsavel: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName:'exames',
    timestamps: false,
    engine: 'InnoDB',
    indexes:[
        {
            name: 'fk_exame_atendimento_idx',
            fields: '[id_atendimento_biomedicina ]'
        }
    ]
});

return Exames

}