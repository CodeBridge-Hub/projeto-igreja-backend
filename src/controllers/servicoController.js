import * as servicoService from "../services/servicoService.js";

// Função principal de CRIAÇÃO (TELA 1 - Dados Pessoais)

export async function findAll(req, res) {
  try {
    const servicos = await servicoService.findAll();
    return res.status(200).json(servicos);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return res.status(500).json({ erro: "Falha ao buscar serviços." });
  }
}

