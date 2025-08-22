import { openDb } from "../config/db.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: "./database.sqlite",
  driver: sqlite3.Database
});

export const getMedico = async (req, res) => {
  try {
    const db = await dbPromise;
    const medico = await db.all("SELECT * FROM medico");

    res.json(medico);
  } catch (err) {
    console.error("❌ Erro no getMedico:", err);
    res.status(500).json({ error: "Erro ao buscar médico" });
  }
};

export const loginMedico = async (req, res) => {
  try {
    console.log("📥 Body recebido:", req.body);

    const { cd_medico, nm_medico } = req.body;

    if (!cd_medico || !nm_medico) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const db = await dbPromise;

    const medico = await db.get(
      "SELECT * FROM medicos WHERE cd_medico = ? AND nm_medico = ?",
      [cd_medico, nm_medico]
    );

    if (!medico) {
      return res.status(401).json({ error: "Médico não encontrado ou dados inválidos" });
    }

    res.json({ message: "Login realizado com sucesso", medico });
  } catch (err) {
    console.error("❌ Erro no loginMedico:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

