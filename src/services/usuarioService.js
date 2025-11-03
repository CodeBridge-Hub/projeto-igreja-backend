import {Usuario} from '../../config/database.js'; 

export function findAll() {
    return Usuario.findAll();
}

export function findById(id) {
    return Usuario.findByPk(id);
}

export function findByEmail(email) {
    return Usuario.findOne({ where: { email } });
}