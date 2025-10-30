import {Responsavel} from '../../config/database.js'; 

export function findAll() {
    return Responsavel.findAll();
}

export function findById(id) {
    return Responsavel.findByPk(id);
}

export function createResponsavel(dadosCadastro) {
    return Responsavel.create(dadosCadastro);
}
