import * as usuarioService from "../services/usuarioService.js";
import { sequelize } from "../../config/database.js";
import * as enderecoService from "../services/enderecoService.js";
import * as responsavelService from "../services/responsavelService.js";
import bcrypt from "bcrypt";

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
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios." });
    }

    const usuario = await usuarioService.findByEmail(email);

    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    const senhaHash = usuario.senha;
    const senhaCorreta = await bcrypt.compare(senha, senhaHash);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    const { senha: _s, ...usuarioSemSenha } = usuario.toJSON ? usuario.toJSON() : usuario;

    return res.status(200).json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro ao autenticar paciente por email:", error);
    return res.status(500).json({ erro: "Falha ao autenticar paciente." });
  }
}

export async function create(req, res) {
  try {
    const dados = req.body;
    const usuarioCriado = await usuarioService.create(dados);
    const { senha: _s, ...usuarioSemSenha } = usuarioCriado.toJSON();
    return res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro ao criar paciente:", error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Já existe registro com valores únicos conflitantes.' });
    }
    return res.status(500).json({ erro: "Falha ao criar paciente." });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;

    const usuarioAtualizado = await usuarioService.update(id, dados);
    if (!usuarioAtualizado) {
      return res.status(404).json({ erro: "Paciente não encontrado." });
    }
    const { senha: _s, ...usuarioSemSenha } = usuarioAtualizado.toJSON();
    return res.status(200).json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Já existe registro com valores únicos conflitantes.' });
    }
    return res.status(500).json({ erro: "Falha ao atualizar paciente." });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    const removed = await usuarioService.remove(id);
    if (!removed) {
      return res.status(404).json({ erro: "Paciente não encontrado." });
    }
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover paciente:", error);
    return res.status(500).json({ erro: "Falha ao remover paciente." });
  }
}