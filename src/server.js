import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import juegosRoutes from "./routes/juegosRoutes.js";
import resenasRoutes from "./routes/resenasRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*", 
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Ruta de prueba / healthcheck
app.get("/", (_req, res) => {
  res.json({ status: "OK", service: "GameTracker API" });
});

// Rutas principales
app.use("/api/juegos", juegosRoutes);
app.use("/api/resenas", resenasRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: `Ruta ${req.originalUrl} no encontrada` });
});

// Manejo centralizado de errores
app.use((err, _req, res, _next) => {
  console.error("Error no controlado:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Conexión BD y arranque
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`API escuchando en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Error conetando a MongoDB", err);
    process.exit(1);
  });
