import * as setorServicoService from "../services/setorServicoService.js";

// Função principal de CRIAÇÃO (TELA 1 - Dados Pessoais)

export async function findAll(req, res) {
  try {
    const {id_servico } = req.params
    const setores = await setorServicoService.findByIdService(id_servico);
    return res.status(200).json(setores);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return res.status(500).json({ erro: "Falha ao buscar serviços." });
  }
}

