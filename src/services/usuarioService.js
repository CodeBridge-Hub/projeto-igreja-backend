import bcrypt from 'bcrypt';
import {Usuario} from '../../config/database.js'; 
import { sequelize } from '../../config/database.js';

const SALT_ROUNDS = 10;

export function findAll() {
    return Usuario.findAll();
}

export function findById(id) {
    return Usuario.findByPk(id);
}

export function findByEmail(email) {
    return Usuario.findOne({ where: { email } });
}

export async function create(dados) {
    if (dados.cpf) {
        dados.cpf = String(dados.cpf).replace(/\D/g, '');
    }

// Hash da senha
    if (!dados.senha) {
        throw new Error('Senha é obrigatória');
    }
    const hash = await bcrypt.hash(dados.senha, SALT_ROUNDS);
    dados.senha = hash;

// Criar dentro de transação por segurança
    return sequelize.transaction(async (t) => {
        const usuario = await Usuario.create(dados, { transaction: t });
    return usuario;
    });
}

// Atualiza um usuário existente.
export async function update(id, dados) {
    if (dados.cpf) {
        dados.cpf = String(dados.cpf).replace(/\D/g, '');
    }

    // Se senha fornecida, hashear
    if (dados.senha) {
        const hash = await bcrypt.hash(dados.senha, SALT_ROUNDS);
        dados.senha = hash;
    } else {
    delete dados.senha;
    }

    return sequelize.transaction(async (t) => {
        const usuario = await Usuario.findByPk(id, { transaction: t });
    if (!usuario) return null;

    await usuario.update(dados, { transaction: t });
    return usuario;
    });
}

// Remove um usuário por id.
export async function remove(id) {
    return sequelize.transaction(async (t) => {
        const usuario = await Usuario.findByPk(id, { transaction: t });
    if (!usuario) return false;
    await usuario.destroy({ transaction: t });
    return true;
    });
}