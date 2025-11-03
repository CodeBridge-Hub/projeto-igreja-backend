import * as pacienteService from "../services/pacienteService.js";
import { sequelize } from "../../config/database.js";
import * as enderecoService from "../services/enderecoService.js";
import * as responsavelService from "../services/responsavelService.js";

// Função principal de CRIAÇÃO (TELA 1 - Dados Pessoais)

export async function findAll(req, res) {
  try {
    const pacientes = await pacienteService.findAll();
    return res.status(200).json(pacientes);
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return res.status(500).json({ erro: "Falha ao buscar pacientes." });
  }
}

export async function create(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { paciente, endereco, responsavel } = req.body;

    // Cria o endereço sempre
    const enderecoReq = await enderecoService.createEndereco(endereco, { transaction });

    // Só cria o responsável se paciente.possui_responsavel for true
    let responsavelReq = null;
    if (paciente.possui_responsavel) {
      responsavelReq = await responsavelService.createResponsavel(responsavel, { transaction });
      console.log("Responsavel criado:", responsavelReq);
    }

    console.log("Endereco criado:", enderecoReq);

    // Cria o paciente com ou sem responsável
    const pacienteReq = await pacienteService.createPaciente(
      {
        ...paciente,
        id_endereco: enderecoReq.id,
        id_responsavel: responsavelReq ? responsavelReq.id : null
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json(pacienteReq);

  } catch (error) {
    await transaction.rollback();
    console.error("Erro ao criar paciente:", error);
    return res.status(500).json({ erro: "Falha ao criar paciente." });
  }
}

