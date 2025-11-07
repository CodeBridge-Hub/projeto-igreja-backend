// filaExibicao.js
export const filaExibicao = [];
import * as atendimentoService from "./services/atendimentoService.js";
import { sequelize } from "../config/database.js";
import { emitirAtualizacaoFila, emitirAtualizacaoFilaExibicao } from "./sockets/socket.js";

export const TEMPO_MAXIMO = 2 * 60 * 1000;

// Recebe opcionalmente a transação
export async function removerExpirados() {
  const agora = Date.now();
  let atualizou = false;

  await sequelize.transaction(async (t) => {
    for (let i = filaExibicao.length - 1; i >= 0; i--) {
      const item = filaExibicao[i];
      if (agora - item.timestamp > TEMPO_MAXIMO) {
        filaExibicao.splice(i, 1);
        await atendimentoService.backToWaiting(item.id, t);
        atualizou = true;
      }
    }

    if (atualizou) {
      const filaAtualizada = await atendimentoService.getAvailableAppointments();
      emitirAtualizacaoFila(filaAtualizada);
      emitirAtualizacaoFilaExibicao(filaExibicao);
    }
  });
}


export function iniciarMonitorFila() {
  setInterval(() => {
    console.log("Verificando senhas expiradas na fila de exibição...");
    removerExpirados().catch(console.error);
  }, 5000);
}

export function removerEmAtendimento(atendimento) {
  // Verifica se o atendimento está em atendimento
  if (!atendimento || atendimento.status !== "em_atendimento") {
    return false;
  }

  // Procura o atendimento na fila de exibição
  const index = filaExibicao.findIndex(item => item.id === atendimento.id);
  if (index === -1) {
    return false;
  }

  // Remove o atendimento da fila
  filaExibicao.splice(index, 1);

  // Emite as atualizações para os clientes
  emitirAtualizacaoFilaExibicao(filaExibicao);

  return true;
}
