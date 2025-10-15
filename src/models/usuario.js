import { DataTypes } from 'sequelize';

export default (sequelize) => {
const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome_usuario: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true 
  },
  senha: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  setor: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  permissao_acesso: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'usuario',
  timestamps: false,
  engine: 'InnoDB'   
});

return Usuario;

}