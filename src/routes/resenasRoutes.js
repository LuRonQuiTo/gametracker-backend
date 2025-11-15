import { Router } from "express";
import {
  obtenerTodasResenas,
  obtenerResenasPorJuego,
  crearResena,
  actualizarResena,
  eliminarResena,
} from "../controllers/resenasController.js";

const router = Router();

// usamos "resenas" en la URL (sin ñ) por temas técnicos
router.get("/", obtenerTodasResenas);
router.get("/juego/:juegoId", obtenerResenasPorJuego);
router.post("/", crearResena);
router.put("/:id", actualizarResena);
router.delete("/:id", eliminarResena);

export default router;
