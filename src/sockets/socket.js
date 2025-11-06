import { Server } from "socket.io";

let io; // variável para guardar a instância e exportar para fora

export function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://portaligreja.siaeserver.com', 'http://localhost:5174'],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("Tela conectada:", socket.id);

    socket.on("disconnect", () => {
      console.log("Tela desconectada:", socket.id);
    });
  });
}

export function emitirSenhaChamada(senha) {
  io.emit("nova-senha", senha);
}

export function emitirAtualizacaoFila(dados) {
  io.emit("fila-atualizada", { dados });
}

