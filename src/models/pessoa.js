import { DataTypes } from 'sequelize';

export default (sequelize) => {
const Pessoa = sequelize.define('pessoa',{

    id_pessoa:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    
    },

    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo:{
        type: DataTypes.ENUM('Masculino', 'Feminino'),
        allowNull: false,

    },
    possui_deficiencia:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    telefone_contato:{
        type: DataTypes.STRING,
        allowNull: false

    },
    tipo_deficiencia:{
        type: DataTypes.STRING,
        allowNull: false
    },
    condicoes_pre_existentes:{
        type: DataTypes.STRING,
        allowNull: false
    },

    id_endereco:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'endereco',
            key: 'id_endereco'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },

    id_responsavel:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'responsavel',
            key: 'id_responsavel'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'pessoa',
    timestamps: false,
    indexes:[
        {
            name: 'fk_pessoa_endereco_idx',
            fields: ['id_endereco']
        },
        {
            name: 'fk_pessoa_responsavel_idx',
            fields: ['id_endereco']
        }
    ]
});

return Pessoa;

};