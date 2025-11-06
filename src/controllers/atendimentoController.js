import { sequelize } from "../../config/database.js";
import * as atendimentoService from "../services/atendimentoService.js";
import { emitirAtualizacaoFila } from "../sockets/socket.js";
import { emitirSenhaChamada } from "../sockets/socket.js";

export async function getAvailableAppointments(req, res) {
  try {
    const atendimentosAguardando = await atendimentoService.getAvailableAppointments();
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
      return res.status(404).json({ mensagem: "Nenhum atendimento disponível encontrado para o serviço especificado." });
    }
    return res.status(200).json(nextAtendimento);
  } catch (error) {
    console.error("Erro ao buscar o próximo atendimento disponível por serviço:", error);
    return res.status(500).json({ erro: "Falha ao buscar o próximo atendimento disponível por serviço." });
  }
}

export async function callNextAppointment(req, res) {
  const { servicoId } = req.params;

  try {
    let next;

    await sequelize.transaction(async (t) => {
      // Busca o próximo atendimento já filtrado pelo serviço
      next = await atendimentoService.getNextAvailableAppointmentByService(
        servicoId,
        { transaction: t }
      );

      if (!next) return; // não retorna resposta aqui

      // Atualiza status
      await next.update({ status: "chamado" }, { transaction: t });
    });

    if (!next) {
      return res.status(404).json({ message: "Nenhuma senha disponível" });
    }

    const filaAtualizada = await atendimentoService.getAvailableAppointments();
    emitirAtualizacaoFila(filaAtualizada);

    // 🔔 Avisa as telas *depois* da transação confirmar
    emitirSenhaChamada({
      id: next.id,
      cod: next.cod,
      servico: next.id_servico,
      paciente: next.id_paciente,
      status: next.status
    });

    return res.status(200).json(next);

  } catch (err) {
    console.error("Erro ao chamar próxima senha:", err);
    return res.status(500).json({ error: "Erro ao chamar próxima senha" });
  }
}
