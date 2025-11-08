import {Servico} from '../../config/database.js'; 

export function findAll() {
    return Servico.findAll();
}
