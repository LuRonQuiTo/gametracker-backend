import mongoose from "mongoose";

/**
 * Videojuegos (Games)
 * {
 *   _id: ObjectId,
 *   titulo: String,
 *   genero: String,
 *   plataforma: String,
 *   anioLanzamiento: Number,
 *   desarrollador: String,
 *   imagenPortada: String,
 *   descripcion: String,
 *   completado: Boolean,
 *   fechaCreacion: Date
 * }
 */

const juegoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    genero: { type: String, trim: true },
    plataforma: { type: String, trim: true },
    anioLanzamiento: { type: Number, min: 1970 },
    desarrollador: { type: String, trim: true },
    imagenPortada: { type: String, trim: true },
    descripcion: { type: String, trim: true },
    completado: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export default mongoose.model("Juego", juegoSchema);
