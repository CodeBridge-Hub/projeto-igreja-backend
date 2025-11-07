import { Atendimento, Pessoa } from "../../config/database.js";

export async function getAvailableAppointments() {
  const atendimentos = await Atendimento.findAll({
    include: [{ model: Pessoa, as: "paciente" }]
    });


  const pacientesEmAtendimento = new Set(
    atendimentos.filter((a) => 
      ["em_atendimento", "chamado"].includes(a.status)).map((a) => a.id_paciente));

  const servicosOcupados = new Set(atendimentos.filter((atendimento) => atendimento.status === "em_atendimento" || atendimento.status === "chamado").map((atendimento) => atendimento.id_servico));

  const atendimentosAguardando = 
  atendimentos.filter((atendimento) => atendimento.status === "aguardando" && 
  !pacientesEmAtendimento.has(atendimento.id_paciente) && 
  !servicosOcupados.has(atendimento.id_servico)).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return atendimentosAguardando;
}

export function getNextAvailableAppointment() {
  return getAvailableAppointments().then((atendimentos) => atendimentos[0] || null);
}

export async function getNextAvailableAppointmentByService(id_servico) {
  const atendimentos = await Atendimento.findAll({
    include: [{ model: Pessoa, as: "paciente" }]
    });

  const pacientesEmAtendimento = new Set(atendimentos.filter((a) => a.status === "em_atendimento" || a.status === "chamado").map((a) => a.id_paciente));

  const servicoOcupado = atendimentos.some((atendimento) => (atendimento.status === "em_atendimento" || atendimento.status === "chamado") && atendimento.id_servico === parseInt(id_servico));
  if (servicoOcupado) return null;

  const atendimentosAguardando = atendimentos.filter((atendimento) => atendimento.status === "aguardando" && atendimento.id_servico === parseInt(id_servico) && !pacientesEmAtendimento.has(atendimento.id_paciente)).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return atendimentosAguardando[0] || null;
}

export async function getCountCalledAppointments() {
  return Atendimento.count({
    where: { status: "chamado" },
  });
}

export async function getCalledAppointmentByService(id_servico) {
  const atendimento = await Atendimento.findOne({
    where: { id_servico: parseInt(id_servico), status: "chamado" },
    include: [{ model: Pessoa, as: "paciente" }],
  });

  return atendimento || null;
}

export async function getProgressAppointmentByService(id_servico) {
  const atendimento = await Atendimento.findOne({
    where: { id_servico: parseInt(id_servico), status: "em_atendimento" },
    include: [{ model: Pessoa, as: "paciente" }],
  });
  console.log(atendimento);
  return atendimento || null;
}
export async function backToWaiting(atendimentoId, transaction = null) {
  const atendimento = await Atendimento.findByPk(atendimentoId, { transaction });
  if (!atendimento) throw new Error("Atendimento não encontrado");

  await atendimento.update(
    { status: "aguardando" },
    { transaction }
  );
  console.log(`Atendimento ${atendimento} retornou para aguardando.`);
  return atendimento;
}

export async function startAppointment(atendimentoId, transaction = null) {
  const atendimento = await Atendimento.findByPk(atendimentoId, {
    transaction,
    include: [{ model: Pessoa, as: "paciente" }],
  });

  if (!atendimento) {
    const err = new Error("Atendimento não encontrado");
    err.code = "NOT_FOUND";
    throw err;
  }

  if (atendimento.status !== "chamado") {
    const err = new Error("Atendimento não está no estado 'chamado'");
    err.code = "INVALID_STATUS";
    throw err;
  }

  await atendimento.update({ status: "em_atendimento" }, { transaction });
  return atendimento;
}

export async function finishAppointment(atendimentoId, transaction = null) {
  const atendimento = await Atendimento.findByPk(atendimentoId, {
    transaction,
    include: [{ model: Pessoa, as: "paciente" }],
  });

  if (!atendimento) {
    const err = new Error("Atendimento não encontrado");
    err.code = "NOT_FOUND";
    throw err;
  }

  if (atendimento.status !== "em_atendimento") {
    const err = new Error("Atendimento não está em atendimento");
    err.code = "INVALID_STATUS";
    throw err;
  }

  await atendimento.update({ status: "finalizado" }, { transaction });
  return atendimento;
}
