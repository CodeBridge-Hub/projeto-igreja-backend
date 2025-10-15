import { DataTypes } from 'sequelize'; //Importa a ferramenta de Tipos de Dados do Sequelize

//função que recebe a instância do Sequelize como argumento
export default (sequelize) => {
    //Model Endereço
    const Endereco = sequelize.define('Endereco', {
        // ---COLUNAS---
        id_endereco: {
            type: DataTypes.INTEGER, // Tipo de dado para números inteiros
            primaryKey: true, // Define esta coluna como a Chave Primária (PK)
            autoIncrement: true, // Define a coluna para ser incrementada automaticamente
        },
        rua: {
            type: DataTypes.STRING(250), // Tipo string com limite de 250 caracteres
            allowNull: true // Permite que o campo seja nulo (NULL) no banco
        },
        numero: {
            type: DataTypes.STRING(40), 
            allowNull: true
        },
        complemento: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        bairro: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        cidade: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        cep: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
    }, {
        // ---OPÇÕES DO MODEL---
        tableName: 'Endereco', // Garante que o Sequelize crie a tabela exatamente como 'Endereco' no seu banco.
        timestamps: false,
        engine: 'InnoDB'

    });

    return Endereco;
};