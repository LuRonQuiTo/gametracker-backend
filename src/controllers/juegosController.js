import Juego from "../models/Juego.js";

// GET /api/juegos
export const obtenerJuegos = async (_req, res, next) => {
  try {
    const juegos = await Juego.find().sort({ fechaCreacion: -1 });
    res.json(juegos);
  } catch (error) {
    console.error("Error al obtener juegos:", error);
    next(error);
  }
};

// GET /api/juegos/:id
export const obtenerJuegoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const juego = await Juego.findById(id);
    if (!juego) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json(juego);
  } catch (error) {
    console.error("Error al obtener juego por id:", error);
    next(error);
  }
};

// POST /api/juegos
export const crearJuego = async (req, res, next) => {
  try {
    const data = req.body;
    const nuevoJuego = new Juego(data);
    const guardado = await nuevoJuego.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error("Error al crear juego:", error);
    next(error);
  }
};

// PUT /api/juegos/:id
export const actualizarJuego = async (req, res, next) => {
  try {
    const { id } = req.params;
    const actualizado = await Juego.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!actualizado) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar juego:", error);
    next(error);
  }
};

// DELETE /api/juegos/:id
export const eliminarJuego = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminado = await Juego.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error al eliminar juego:", error);
    next(error);
  }
};
