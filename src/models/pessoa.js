import { DataTypes } from 'sequelize';

export default (sequelize) => {
const Pessoa = sequelize.define('pessoa',{

    id:{
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
    escolaridade:{
        type: DataTypes.STRING,
        allowNull: true
    },
    estado_civil:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true
    },
    possui_responsavel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    condicao_saude:{
        type: DataTypes.STRING,
        allowNull: false
    },
    condicao_saude_outro:{
        type: DataTypes.STRING,
        allowNull: false
    },
    possui_deficiencia:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: true

    },
    deficiencia:{
        type: DataTypes.STRING,
        allowNull: true
    },
    profissao:{
        type: DataTypes.STRING,
        allowNull: false
    },
    situacao_empregaticia:{
        type: DataTypes.STRING,
        allowNull: false
    },
    situacao_empregaticia_outro:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observacoes:{
        type: DataTypes.STRING,
        allowNull: true
    },
    id_endereco:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'endereco',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },

    id_responsavel:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'responsavel',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'pessoa',
    schema: 'pacientes',
    timestamps: false,
    indexes:[
        {
            name: 'fk_pessoa_endereco_idx',
            fields: ['id_endereco']
        },
        {
            name: 'fk_pessoa_responsavel_idx',
            fields: ['id_responsavel']
        }
    ]
});

return Pessoa;

};