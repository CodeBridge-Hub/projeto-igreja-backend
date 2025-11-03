import * as usuarioService from "../services/usuarioService.js";
import { sequelize } from "../../config/database.js";
import * as enderecoService from "../services/enderecoService.js";
import * as responsavelService from "../services/responsavelService.js";

// Função principal de CRIAÇÃO (TELA 1 - Dados Pessoais)

export async function findAll(req, res) {
  try {
    const usuarios = await usuarioService.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return res.status(500).json({ erro: "Falha ao buscar pacientes." });
  }
}

export async function findByEmail(req, res) {
  try {
    const { email } = req.body;
    const usuario = await usuarioService.findByEmail(email);
    if (!usuario) {
      return res.status(404).json({ erro: "Paciente não encontrado." });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao buscar paciente por email:", error);
    return res.status(500).json({ erro: "Falha ao buscar paciente por email." });
  }
}
