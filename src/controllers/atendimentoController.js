import { sequelize } from "../../config/database.js";
import * as atendimentoService from "../services/atendimentoService.js";
import { emitirAtualizacaoFila } from "../sockets/socket.js";
import { emitirSenhaChamada } from "../sockets/socket.js";
import { emitirAtualizacaoFilaExibicao } from "../sockets/socket.js";
import { filaExibicao, removerExpirados, removerEmAtendimento } from "../filaExibicao.js";

export async function getAvailableAppointments(req, res) {
  try {
    const atendimentosAguardando = await atendimentoService.getAvailableAppointments();
    emitirAtualizacaoFilaExibicao(filaExibicao);
    return res.status(200).json(atendimentosAguardando);
  } catch (error) {
    console.error("Erro ao buscar atendimentos aguardando:", error);
    return res.status(500).json({ erro: "Falha ao buscar atendimentos aguardando." });
  }
}

export async function getNextAvailableAppointment(req, res) {
  try {
    const nextAtendimento = await atendimentoService.getNextAvailableAppointment();
    if (!nextAtendimento) {
      return res.status(404).json({ mensagem: "Nenhum atendimento disponível encontrado." });
    }
    return res.status(200).json(nextAtendimento);
  } catch (error) {
    console.error("Erro ao buscar o próximo atendimento disponível:", error);
    return res.status(500).json({ erro: "Falha ao buscar o próximo atendimento disponível." });
  }
}

export async function getNextAvailableAppointmentByService(req, res) {
  const { id_servico } = req.params;
  try {
    const nextAtendimento = await atendimentoService.getNextAvailableAppointmentByService(id_servico);
    if (!nextAtendimento) {
      return res.status(204).json({ mensagem: "Nenhum atendimento disponível encontrado para o serviço especificado." });
    }
    return res.status(200).json(nextAtendimento);
  } catch (error) {
    console.error("Erro ao buscar o próximo atendimento disponível por serviço:", error);
    return res.status(500).json({ erro: "Falha ao buscar o próximo atendimento disponível por serviço." });
  }
}

export async function getCalledAppointmentByService(req, res) {
  const { id_servico } = req.params;

  const transaction = await sequelize.transaction();
  try {
    const chamado = await atendimentoService.getCalledAppointmentByService(id_servico, transaction);

    await transaction.commit();

    if (!chamado) {
      return res.status(204).json({
        mensagem: "Nenhum atendimento com status 'chamado' encontrado para o serviço especificado.",
      });
    }

    return res.status(200).json(chamado);
  } catch (error) {
    await transaction.rollback();
    console.error("Erro ao buscar atendimento chamado por serviço:", error);
    return res.status(500).json({ erro: "Falha ao buscar atendimento chamado por serviço." });
  }
}

export async function getProgressAppointmentByService(req, res) {
  const { id_servico } = req.params;
  try {
    const chamado = await atendimentoService.getProgressAppointmentByService(id_servico);
    if (!chamado) {
      return res.status(204).json({ mensagem: "Nenhum atendimento com status 'em_atendimento' encontrado para o serviço especificado." });
    }
    return res.status(200).json(chamado);
  } catch (error) {
    console.error("Erro ao buscar atendimento por serviço:", error);
    return res.status(500).json({ erro: "Falha ao buscar atendimento por serviço." });
  }
}

export async function startAppointment(req, res) {
  const { id } = req.params; // atendimento id
  try {
    let updated;

    await sequelize.transaction(async (t) => {
      updated = await atendimentoService.startAppointment(id, t);
    });

    // Remove da fila de exibição e atualiza filas
    removerEmAtendimento(updated);
    const filaAguardando = await atendimentoService.getAvailableAppointments();
    emitirAtualizacaoFila(filaAguardando);

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Erro ao iniciar atendimento:", err);
    if (err.code === "NOT_FOUND") {
      return res.status(404).json({ erro: "Atendimento não encontrado." });
    }
    if (err.code === "INVALID_STATUS") {
      return res.status(409).json({ erro: "Atendimento precisa estar com status 'chamado' para ser iniciado." });
    }
    return res.status(500).json({ erro: "Falha ao iniciar atendimento." });
  }
}

export async function callNextAppointment(req, res) {
  const { servicoId } = req.params;

  try {
    let next;

    await sequelize.transaction(async (t) => {
      await removerExpirados(t);
      if (filaExibicao.length >= 4) {
        return res.status(409).json({
          message: "Painel cheio — aguarde uma senha expirar ou ser atendida.",
        });
      }

      next = await atendimentoService.getNextAvailableAppointmentByService(servicoId, { transaction: t });

      if (!next) return;

      await next.update({ status: "chamado" }, { transaction: t });
    });

    if (!next) {
      return res.status(404).json({ message: "Nenhuma senha disponível" });
    }

    filaExibicao.unshift({
      id: next.id,
      cod: next.cod,
      servico: next.id_servico,
      paciente: next.id_paciente,
      timestamp: Date.now(),
    });

    // Atualiza painel
    emitirAtualizacaoFilaExibicao(filaExibicao);

    // Atualiza fila dos que estão esperando atendimento
    const filaAguardando = await atendimentoService.getAvailableAppointments();
    emitirAtualizacaoFila(filaAguardando);

    // Tocar áudio / Destaque de chamada
    emitirSenhaChamada({
      id: next.id,
      cod: next.cod,
      servico: next.id_servico,
      paciente: next.id_paciente,
      status: next.status,
    });

    return res.status(200).json(next);
  } catch (err) {
    console.error("Erro ao chamar próxima senha:", err);
    return res.status(500).json({ error: "Erro ao chamar próxima senha" });
  }
}

export async function finishAppointmentById(req, res) {
  const { id } = req.params;

  const transaction = await sequelize.transaction();
  try {
    const atendimentoFinalizado = await atendimentoService.finishAppointment(id, transaction);

    await transaction.commit();
    const filaAtualizada = await atendimentoService.getAvailableAppointments();
    emitirAtualizacaoFila(filaAtualizada);
    
    return res.status(200).json(atendimentoFinalizado);
  } catch (error) {
    await transaction.rollback();

    if (error.code === "NOT_FOUND") {
      return res.status(404).json({ error: error.message });
    }

    if (error.code === "INVALID_STATUS") {
      return res.status(400).json({ error: error.message });
    }

    console.error("Erro ao finalizar atendimento:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
