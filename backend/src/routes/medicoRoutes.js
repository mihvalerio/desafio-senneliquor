import express from "express";
import { getMedicos, loginMedico } from "../controllers/medicoController.js";

const router = express.Router();

router.get("/medicos", getMedicos);
router.post("/login", loginMedico);

export default router;