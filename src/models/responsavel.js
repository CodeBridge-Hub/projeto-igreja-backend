import { DataTypes } from 'sequelize';

export default (sequelize) => {
const Responsavel = sequelize.define('responsavel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_responsavel: {
        type: DataTypes.STRING,
        allowNull: false
        
    },
    cpf_responsavel:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        
    },

    telefone_responsavel:{
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    parentesco:{
        type: DataTypes.ENUM('pai', 'mae', 'irmao', 'irma', 'avo', 'tio', 'tia', 'outro' ),
        allowNull: false,
        validate: {
        isIn: {
        args: [['pai', 'mae', 'irmao', 'irma', 'avo', 'tio', 'tia', 'outro']],
        msg: 'O valor de parentesco deve ser um dos seguintes: pai, mae, irmao, irma, avo, tio, tia ou outro.'
    }
    }
    }
}, {
    tableName: 'responsavel',
    timestamps: true,
    engine: 'InnoDB'

});

return Responsavel

}