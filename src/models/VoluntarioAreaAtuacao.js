import { DataTypes } from 'sequelize';

// Importação dos modelos
import Voluntario from './Voluntario.js';
import AreaAtuacao from './AreaAtuacao.js';

export default (sequelize) => {
const VoluntarioAreaAtuacao = sequelize.define('VoluntarioAreaAtuacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    tableName: 'voluntario_area_atuacao',
    timestamps: false
});

// Define os relacionamentos N:N
Voluntario.belongsToMany(AreaAtuacao(sequelize), {
    through: VoluntarioAreaAtuacao,
    foreignKey: 'id_voluntario',
    onDelete: 'CASCADE'
});

AreaAtuacao(sequelize).belongsToMany(Voluntario, {
    through: VoluntarioAreaAtuacao,
    foreignKey: 'id_area_atuacao',
    onDelete: 'CASCADE'
});

return VoluntarioAreaAtuacao;
};