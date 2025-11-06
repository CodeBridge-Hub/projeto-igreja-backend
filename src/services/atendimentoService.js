import { Atendimento } from "../../config/database.js";

export async function getAvailableAppointments() {
    let atendimentos = await Atendimento.findAll()

    const pacientesEmAtendimento = new Set(
    atendimentos
        .filter(a =>
        ['em_atendimento', 'chamado'].includes(a.status))
        .map(a => a.id_paciente)
    );

    const servicosOcupados = new Set(
        atendimentos
            .filter(atendimento => atendimento.status === 'em_atendimento' || atendimento.status === 'chamado')
            .map(atendimento => atendimento.id_servico)
    )

    const atendimentosAguardando = atendimentos.filter(atendimento => 
        atendimento.status === 'aguardando' &&
        !pacientesEmAtendimento.has(atendimento.id_paciente) &&
        !servicosOcupados.has(atendimento.id_servico)
    )
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    
    return atendimentosAguardando;
}

export function getNextAvailableAppointment() {
    return getAvailableAppointments().then(atendimentos => atendimentos[0] || null);
}

export async function getNextAvailableAppointmentByService(id_servico) {
    const atendimentos = await Atendimento.findAll()
    
    const pacientesEmAtendimento = new Set(
    atendimentos
      .filter(a => a.status === 'em_atendimento' || a.status === 'chamado')
      .map(a => a.id_paciente)
    );

    const servicoOcupado = atendimentos.some(atendimento => 
        (atendimento.status === 'em_atendimento' || atendimento.status === 'chamado') &&
        atendimento.id_servico === parseInt(id_servico)
    )
    if (servicoOcupado) return null;

    console.log('Servico ocupad?', servicoOcupado);
    
    const atendimentosAguardando = atendimentos.filter(atendimento => 
        atendimento.status === 'aguardando' &&
        atendimento.id_servico === parseInt(id_servico) &&
        !pacientesEmAtendimento.has(atendimento.id_paciente)
    )
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    console.log('Atendimentos aguardando por servico:', atendimentosAguardando);
    return atendimentosAguardando[0] || null;

}