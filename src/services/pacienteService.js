import {Pessoa} from '../../config/database.js'; 

export function findAll() {
    return Pessoa.findAll();
}

export function findById(id) {
    return Pessoa.findByPk(id);
}

export function createPaciente(dadosCadastro) {
    return Pessoa.create(dadosCadastro);
}
