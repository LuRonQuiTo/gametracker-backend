import Resena from "gametracker-backend/models/Resena.js";

// GET /api/resenas
export const obtenerTodasResenas = async (_req, res, next) => {
  try {
    const resenas = await Resena.find().sort({ fechaCreacion: -1 });
    res.json(resenas);
  } catch (error) {
    next(error);
  }
};

// GET /api/resenas/juego/:juegoId
export const obtenerResenasPorJuego = async (req, res, next) => {
  try {
    const { juegoId } = req.params;
    const resenas = await Resena.find({ juegoId }).sort({
      fechaCreacion: -1,
    });
    res.json(resenas);
  } catch (error) {
    next(error);
  }
};

// POST /api/resenas
export const crearResena = async (req, res, next) => {
  try {
    const nuevaResena = new Resena(req.body);
    const guardada = await nuevaResena.save();
    res.status(201).json(guardada);
  } catch (error) {
    next(error);
  }
};

// PUT /api/resenas/:id
export const actualizarResena = async (req, res, next) => {
  try {
    const { id } = req.params;
    const actualizada = await Resena.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!actualizada) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.json(actualizada);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/resenas/:id
export const eliminarResena = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminada = await Resena.findByIdAndDelete(id);

    if (!eliminada) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
