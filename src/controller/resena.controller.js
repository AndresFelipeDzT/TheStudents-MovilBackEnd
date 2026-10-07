import { Resena } from "../models/Resena.js";
import { Inscripcion } from "../models/Inscripcion.js";
import { QueryTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const getResenasByResenadoId = async (req, res) => {
    const { resenado_id } = req.params;
    try {
        const resenas = await sequelize.query(
            `SELECT resena.*
            FROM "Resenas" AS resena
            INNER JOIN "Inscripcions" AS inscripcion
                ON resena.inscripcion_resenado_id = inscripcion.id
            WHERE inscripcion.usuario_id = :resenado_id`,
            {
                replacements: { resenado_id },
                type: QueryTypes.SELECT
            }
        );
        res.json(resenas);
    } catch (error) {
        console.error("Error fetching resenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getResenasByAutorId = async (req, res) => {
    const { autor_id } = req.params;
    try {
        const resenas = await sequelize.query(
            `SELECT resena.*
            FROM "Resenas" AS resena
            INNER JOIN "Inscripcions" AS inscripcion
                ON resena.inscripcion_autor_id = inscripcion.id
            WHERE inscripcion.usuario_id = :autor_id`,
            {
                replacements: { autor_id },
                type: QueryTypes.SELECT
            }
        );
        res.json(resenas);
    } catch (error) {
        console.error("Error fetching resenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createResena = async (req, res) => {
    const { autor_id, resenado_id, materia, periodo, contenido } = req.body;
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
            contenido
        });
        res.status(201).json(newResena);
    } catch (error) {
        console.error("Error creating resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateResena = async (req, res) => {
    const { id } = req.params;
    const { contenido, estado } = req.body;
    const fecha_edicion = new Date();
    try {
        const resena = await Resena.findByPk(id);
        if (!resena) {
            return res.status(404).json({ message: "Resena not found" });
        }
        if (contenido !== undefined || estado !== undefined) {
            await resena.update({ ...(contenido && { contenido }), ...(estado && { estado }), fecha_edicion });
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
