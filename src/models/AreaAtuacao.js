import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const VoluntarioAreaAtuacao = sequelize.define(
    'VoluntarioAreaAtuacao',
    {
        id_voluntario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        },
        id_area_atuacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        },
    },
    {
        tableName: 'voluntario_area_atuacao',
        timestamps: false,
    }
    );

    return VoluntarioAreaAtuacao;
};