const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const Responsavel = sequelize.define('responsavel', {
    nome_responsavel: {
        type: DataTypes.STRING,
        allowNull: false
        
    },
    cpf_responsavel:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        
    },

    telefone:{
        type: DataTypes.STRING,
        allowNull: false,
        
        
    },
    parentesco:{
        type: DataTypes.ENUM('pai', 'mãe', 'irmao', 'irma', 'avo', 'tio', 'tia', 'outro' ),
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
    timestamps: true

});

module.exports = Responsavel

