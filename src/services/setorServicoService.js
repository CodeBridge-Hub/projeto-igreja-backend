import { SetorServico, Setor } from '../../config/database.js'; 

export function findAll() {
    return SetorServico.findAll();
}

export function findByIdService(id_servico) {
    return SetorServico.findAll({
        where: { id_servico },
        include: [
            { model: Setor, as: 'setor' } // <- aqui vai o Setor, não SetorServico
        ]
    });
}
