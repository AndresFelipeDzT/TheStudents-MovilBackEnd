import { Resena } from "../models/Resena.js";
import { Inscripcion } from "../models/Inscripcion.js";


export const getResenasByResenadoId = async (req, res) => {
    const { resenado_id } = req.params;
    try {
        const inscripciones = await Inscripcion.findAll({
            where: { usuario_id: resenado_id },
            attributes: ["id", "materia", "periodo"],
            include: [
                {
                    association: "usuario",
                    attributes: ["id", "nombre_usuario", "nombre", "foto_url", "color_perfil"]
                },
                {
                    association: "autores",
                    attributes: ["id"],
                    include: [{
                        association: "usuario",
                        attributes: ["id", "nombre_usuario", "nombre", "foto_url", "color_perfil"]
                    }],
                    through: {
                        attributes: [
                            "id",
                            "contenido",
                            "likes",
                            "disLikes",
                            "rating",
                            "fecha_creacion",
                            "fecha_edicion",
                            "estado"
                        ]
                    }
                }
            ]
        });
        const resenas = inscripciones.flatMap(inscripcion => {
            const inscripcionResenado = inscripcion.get({ plain: true });
            return inscripcionResenado.autores.map(inscripcionAutor => {
                const resena = inscripcionAutor.Resenas;
                return {
                    id: resena.id,
                    contenido: resena.contenido,
                    likes: resena.likes,
                    disLikes: resena.disLikes,
                    rating: resena.rating,
                    fecha_creacion: resena.fecha_creacion,
                    fecha_edicion: resena.fecha_edicion,
                    estado: resena.estado,
                    autor: inscripcionAutor.usuario,
                    resenado: inscripcionResenado.usuario,
                    materia: inscripcionResenado.materia,
                    periodo: inscripcionResenado.periodo
                };
            });
        });
        res.json(resenas);
    } catch (error) {
        console.error("Error fetching resenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getResenasByAutorId = async (req, res) => {
    const { autor_id } = req.params;
    try {
        const inscripciones = await Inscripcion.findAll({
            where: { usuario_id: autor_id },
            attributes: ["id", "materia", "periodo"],
            include: [
                {
                    association: "usuario",
                    attributes: ["id", "nombre_usuario", "nombre", "foto_url", "color_perfil"]
                },
                {
                    association: "resenados",
                    attributes: ["id"],
                    include: [{
                        association: "usuario",
                        attributes: ["id", "nombre_usuario", "nombre", "foto_url", "color_perfil"]
                    }],
                    through: {
                        attributes: [
                            "id",
                            "contenido",
                            "likes",
                            "disLikes",
                            "rating",
                            "fecha_creacion",
                            "fecha_edicion",
                            "estado"
                        ]
                    }
                }
            ]
        });
        const resenas = inscripciones.flatMap(inscripcion => {
            const inscripcionAutor = inscripcion.get({ plain: true });
            return inscripcionAutor.resenados.map(inscripcionResenado => {
                const resena = inscripcionResenado.Resenas;
                return {
                    id: resena.id,
                    contenido: resena.contenido,
                    likes: resena.likes,
                    disLikes: resena.disLikes,
                    rating: resena.rating,
                    fecha_creacion: resena.fecha_creacion,
                    fecha_edicion: resena.fecha_edicion,
                    estado: resena.estado,
                    autor: inscripcionAutor.usuario,
                    resenado: inscripcionResenado.usuario,
                    materia: inscripcionAutor.materia,
                    periodo: inscripcionAutor.periodo
                };
            });
        });
        res.json(resenas);
    } catch (error) {
        console.error("Error fetching resenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createResena = async (req, res) => {
    const { autor_id, resenado_id, materia, periodo, contenido, rating } = req.body;
    try {
        const [inscripcionAutor, inscripcionResenado] = await Promise.all([
            Inscripcion.findOne({ where: { usuario_id: autor_id, materia, periodo } }),
            Inscripcion.findOne({ where: { usuario_id: resenado_id, materia, periodo } })
        ]);

        if (!inscripcionAutor) {
            return res.status(404).json({
                message: "No enrollment found for the author with the provided subject and period."
            });
        }

        if (!inscripcionResenado) {
            return res.status(404).json({
                message: "No enrollment found for the reviewed user with the provided subject and period."
            });
        }

        const newResena = await Resena.create({
            inscripcion_autor_id: inscripcionAutor.id,
            inscripcion_resenado_id: inscripcionResenado.id,
            contenido,
            ...(rating && { rating })
        });
        res.status(201).json(newResena);
    } catch (error) {
        console.error("Error creating resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateResena = async (req, res) => {
    const { id } = req.params;
    const { contenido, estado, rating } = req.body;
    const fecha_edicion = new Date();
    try {
        const resena = await Resena.findByPk(id);
        if (!resena) {
            return res.status(404).json({ message: "Resena not found" });
        }
        if (contenido !== undefined || estado !== undefined || rating !== undefined) {
            await resena.update({
                ...(contenido && { contenido }),
                ...(estado && { estado }),
                ...(rating && { rating }),
                fecha_edicion
            });
        } else {
            return res.status(400).json({ message: "No fields to update" });
        }
        res.json(resena);
    } catch (error) {
        console.error("Error updating resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteResena = async (req, res) => {
    const { id } = req.params;
    try {
        const resena = await Resena.findByPk(id);
        if (!resena) {
            return res.status(404).json({ message: "Resena not found" });
        }
        await resena.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
