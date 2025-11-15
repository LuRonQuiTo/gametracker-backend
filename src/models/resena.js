import mongoose from "mongoose";

/**
 * Reseñas (Reviews)
 * {
 *   _id: ObjectId,
 *   juegoId: ObjectId,
 *   puntuacion: Number,      // 1-5
 *   textoResena: String,
 *   horasJugadas: Number,
 *   dificultad: String,      // "Fácil", "Normal", "Difícil"
 *   recomendaria: Boolean,
 *   fechaCreacion: Date,
 *   fechaActualizacion: Date
 * }
 */

const resenaSchema = new mongoose.Schema(
  {
    juegoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Juego",
      required: true,
    },
    puntuacion: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    textoResena: {
      type: String,
      required: true,
      trim: true,
    },
    horasJugadas: {
      type: Number,
      default: 0,
      min: 0,
    },
    dificultad: {
      type: String,
      enum: ["Fácil", "Normal", "Difícil"],
      default: "Normal",
    },
    recomendaria: {
      type: Boolean,
      default: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    fechaActualizacion: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

// Actualizar fechaActualizacion automáticamente
resenaSchema.pre("save", function (next) {
  this.fechaActualizacion = new Date();
  next();
});

resenaSchema.pre("findOneAndUpdate", function (next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

export default mongoose.model("Resena", resenaSchema);
