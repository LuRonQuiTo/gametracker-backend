import { Router } from "express";
import {
  obtenerJuegos,
  obtenerJuegoPorId,
  crearJuego,
  actualizarJuego,
  eliminarJuego,
} from "../controllers/juegosController.js";

const router = Router();

router.get("/", obtenerJuegos);
router.get("/:id", obtenerJuegoPorId);
router.post("/", crearJuego);
router.put("/:id", actualizarJuego);
router.delete("/:id", eliminarJuego);

export default router;
