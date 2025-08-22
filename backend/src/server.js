import express from "express";
import cors from "cors";
import medicoRoutes from "./routes/medicoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", medicoRoutes);

app.listen(3001, () => {
  console.log("🚀 Servidor rodando em http://localhost:3001");
});