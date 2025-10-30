import { Endereco } from '../../config/database.js'; 

export function findAll() {
    return Endereco.findAll();
}

export function findById(id) {
    return Endereco.findByPk(id);
}

export function createEndereco(dadosCadastro) {
    return Endereco.create(dadosCadastro);
}
