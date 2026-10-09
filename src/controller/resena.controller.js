import { Op } from "sequelize";
import { Resena } from "../models/Resena.js";
import { Inscripcion } from "../models/Inscripcion.js";
import { Usuario } from "../models/Usuario.js";


export const getResenasByResenadoId = async (req, res) => {
    const { resenado_id } = req.params;
    try {
        const resenas = await Resena.findAll({
            where: { resenado_id },
            include: [
                {
                    model: Usuario,
                    as: "autor"
                },
                {
                    model: Usuario,
                    as: "resenado"
                }
            ],
            attributes: { exclude: ["autor_id", "resenado_id"] }
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
        const resenas = await Resena.findAll({
            where: { autor_id },
            include: [
                {
                    model: Usuario,
                    as: "autor"
                },
                {
                    model: Usuario,
                    as: "resenado"
                }
            ],
            attributes: { exclude: ["autor_id", "resenado_id"] }
        });
        res.json(resenas);
    } catch (error) {
        console.error("Error fetching resenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getResenasExcludingUsuarioId = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const resenas = await Resena.findAll({
            where: {
                autor_id: { [Op.ne]: usuario_id },
                resenado_id: { [Op.ne]: usuario_id }
            },
            include: [
                {
                    model: Usuario,
                    as: "autor"
                },
                {
                    model: Usuario,
                    as: "resenado"
                }
            ],
            attributes: { exclude: ["autor_id", "resenado_id"] }
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
            autor_id,
            resenado_id,
            materia,
            periodo,
            contenido,
            ...(rating && { rating })
        });
        res.status(201).json(newResena);
    } catch (error) {
        console.error("Error creating resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

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
